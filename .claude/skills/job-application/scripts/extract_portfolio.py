#!/usr/bin/env python3
"""
extract_portfolio.py — build a portfolio index skeleton from your repos.

Extracts the mechanical facts (stack, size, README summary, activity, hygiene
signals) so you never have to look them up again. Leaves the judgement calls
blank — what a project *proves* is a decision you make once, deliberately,
not something a script can infer from file extensions.

Usage:
    # local repos
    python extract_portfolio.py ~/code/paper-grader ~/code/moodle-converter

    # every git repo one level under a directory
    python extract_portfolio.py --scan ~/code

    # your GitHub account (requires `gh` CLI, authenticated)
    python extract_portfolio.py --github

    # combine, and write somewhere specific
    python extract_portfolio.py --scan ~/code --github -o portfolio-index.md

Output: portfolio-index.md  (drop into the job-application skill's assets/)
"""

import argparse
import json
import os
import re
import subprocess
import sys
from collections import Counter
from datetime import datetime
from pathlib import Path

LANG_BY_EXT = {
    ".py": "Python", ".js": "JavaScript", ".jsx": "JavaScript", ".ts": "TypeScript",
    ".tsx": "TypeScript", ".rb": "Ruby", ".go": "Go", ".rs": "Rust", ".java": "Java",
    ".kt": "Kotlin", ".swift": "Swift", ".php": "PHP", ".cs": "C#", ".c": "C",
    ".cpp": "C++", ".sh": "Shell", ".sql": "SQL", ".r": "R", ".scala": "Scala",
    ".html": "HTML", ".css": "CSS", ".scss": "CSS", ".vue": "Vue", ".svelte": "Svelte",
    ".ipynb": "Jupyter", ".tf": "Terraform", ".lua": "Lua", ".ex": "Elixir",
}

SKIP_DIRS = {
    ".git", "node_modules", "venv", ".venv", "env", "__pycache__", "dist", "build",
    ".next", ".nuxt", "target", "vendor", ".pytest_cache", ".mypy_cache", "site-packages",
    ".terraform", "coverage", ".tox", "bower_components", ".idea", ".vscode",
}

TEST_HINTS = ("test", "spec", "__tests__")
CI_PATHS = (".github/workflows", ".gitlab-ci.yml", ".circleci", "Jenkinsfile", ".travis.yml")
DEP_FILES = (
    "requirements.txt", "pyproject.toml", "Pipfile", "package.json", "Gemfile",
    "go.mod", "Cargo.toml", "pom.xml", "build.gradle", "composer.json",
)


def run(cmd, cwd=None):
    try:
        r = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, timeout=30)
        return r.stdout.strip() if r.returncode == 0 else ""
    except (subprocess.SubprocessError, FileNotFoundError, OSError):
        return ""


def read_readme(repo):
    for name in ("README.md", "README.rst", "README.txt", "readme.md", "README"):
        p = repo / name
        if p.is_file():
            try:
                return p.read_text(encoding="utf-8", errors="replace")
            except OSError:
                return ""
    return ""


def readme_summary(text, limit=400):
    """First real prose paragraph, minus badges, headings and code fences."""
    if not text:
        return ""
    text = re.sub(r"```.*?```", "", text, flags=re.S)
    lines = []
    for line in text.splitlines():
        s = line.strip()
        if not s:
            if lines:
                break
            continue
        if s.startswith("#") or s.startswith(">"):
            continue
        if re.match(r"^[\[!]*\[.*?\]\(.*?\)\s*$", s):  # badge-only line
            continue
        lines.append(s)
        if sum(len(x) for x in lines) > limit:
            break
    out = " ".join(lines).strip()
    return (out[:limit] + "…") if len(out) > limit else out


def scan_code(repo):
    langs, loc, has_tests = Counter(), 0, False
    for root, dirs, files in os.walk(repo):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS and not d.startswith(".")]
        rel = os.path.relpath(root, repo).lower()
        if any(h in rel for h in TEST_HINTS):
            has_tests = True
        for f in files:
            ext = Path(f).suffix.lower()
            lang = LANG_BY_EXT.get(ext)
            if not lang:
                continue
            if any(h in f.lower() for h in TEST_HINTS):
                has_tests = True
            langs[lang] += 1
            try:
                with open(Path(root) / f, "rb") as fh:
                    n = sum(1 for line in fh if line.strip())
                loc += n
                langs[lang] += 0
            except OSError:
                pass
    return langs, loc, has_tests


def git_facts(repo):
    if not (repo / ".git").exists():
        return {}
    return {
        "last_commit": run(["git", "log", "-1", "--format=%cs"], cwd=repo),
        "first_commit": run(["git", "log", "--reverse", "--format=%cs", "-1"], cwd=repo),
        "commits": run(["git", "rev-list", "--count", "HEAD"], cwd=repo),
        "remote": run(["git", "config", "--get", "remote.origin.url"], cwd=repo),
        "branch": run(["git", "rev-parse", "--abbrev-ref", "HEAD"], cwd=repo),
    }


def hygiene(repo, readme, has_tests):
    """Signals for whether this is presentable to a stranger."""
    flags = []
    if not readme:
        flags.append("no README")
    elif len(readme) < 400:
        flags.append("thin README")
    if not any((repo / p).exists() for p in CI_PATHS):
        flags.append("no CI")
    if not has_tests:
        flags.append("no tests")
    if not any((repo / d).exists() for d in DEP_FILES):
        flags.append("no dependency manifest")
    if not (repo / "LICENSE").exists() and not (repo / "LICENSE.md").exists():
        flags.append("no licence")
    for secret in (".env", "credentials.json", "secrets.yaml", "config.local.json"):
        if (repo / secret).exists():
            flags.append(f"⚠ {secret} present in working tree — check .gitignore")
    return flags


def profile_local(path):
    repo = Path(path).expanduser().resolve()
    if not repo.is_dir():
        return None
    readme = read_readme(repo)
    langs, loc, has_tests = scan_code(repo)
    g = git_facts(repo)
    return {
        "name": repo.name,
        "source": "local",
        "path": str(repo),
        "url": re.sub(r"^git@github\.com:", "https://github.com/", g.get("remote", "")).removesuffix(".git"),
        "summary": readme_summary(readme),
        "langs": [f"{l} ({c} files)" for l, c in langs.most_common(4)],
        "loc": loc,
        "tests": has_tests,
        "flags": hygiene(repo, readme, has_tests),
        "first_commit": g.get("first_commit", ""),
        "last_commit": g.get("last_commit", ""),
        "commits": g.get("commits", ""),
    }


def profile_github():
    """Metadata only — no clone. Requires an authenticated `gh` CLI."""
    raw = run([
        "gh", "repo", "list", "--limit", "100", "--json",
        "name,description,primaryLanguage,url,updatedAt,createdAt,isPrivate,isFork,stargazerCount,repositoryTopics",
    ])
    if not raw:
        print("  (gh returned nothing — is the CLI installed and authenticated? `gh auth status`)", file=sys.stderr)
        return []
    out = []
    for r in json.loads(raw):
        if r.get("isFork"):
            continue
        topics = [t["name"] for t in (r.get("repositoryTopics") or [])]
        out.append({
            "name": r["name"],
            "source": "github (metadata only)",
            "path": "",
            "url": r["url"],
            "summary": r.get("description") or "",
            "langs": [(r.get("primaryLanguage") or {}).get("name", "")] if r.get("primaryLanguage") else [],
            "loc": None,
            "tests": None,
            "flags": (["private — reviewers cannot see this"] if r.get("isPrivate") else [])
                     + ([] if r.get("description") else ["no repo description"]),
            "first_commit": (r.get("createdAt") or "")[:10],
            "last_commit": (r.get("updatedAt") or "")[:10],
            "commits": "",
            "topics": topics,
        })
    return out


def render(projects):
    today = datetime.now().strftime("%Y-%m-%d")
    L = [
        "# Portfolio Index",
        "",
        f"> Generated {today} by `extract_portfolio.py`.",
        "> The mechanical facts are filled in. **The judgement slots are not — that's the point.**",
        "> Fill in `Proves`, `Best for`, and `The one-liner` yourself. Those are the fields that",
        "> actually get used when writing an application; everything above them is just context.",
        "> Regenerate when repos change; the judgement lines are yours to carry forward.",
        "",
        "## At a glance",
        "",
        "| Project | Stack | Last active | Presentable? |",
        "|---|---|---|---|",
    ]
    for p in projects:
        stack = ", ".join(x for x in p["langs"] if x) or "—"
        ok = "⚠ " + "; ".join(p["flags"]) if p["flags"] else "✅"
        L.append(f"| {p['name']} | {stack} | {p['last_commit'] or '—'} | {ok} |")

    L += ["", "---", ""]

    for p in projects:
        L += [f"## {p['name']}", ""]
        if p["url"]:
            L.append(f"**Link:** {p['url']}  ")
        L.append(f"**Source:** {p['source']}  ")
        if p["langs"]:
            L.append(f"**Stack:** {', '.join(x for x in p['langs'] if x)}  ")
        if p["loc"]:
            L.append(f"**Size:** ~{p['loc']:,} non-blank lines  ")
        if p["commits"]:
            L.append(f"**Activity:** {p['commits']} commits, {p['first_commit']} → {p['last_commit']}  ")
        elif p["last_commit"]:
            L.append(f"**Last active:** {p['last_commit']}  ")
        if p.get("topics"):
            L.append(f"**Topics:** {', '.join(p['topics'])}  ")
        if p["tests"] is not None:
            L.append(f"**Tests:** {'yes' if p['tests'] else 'none found'}  ")
        L.append("")
        if p["summary"]:
            L += ["**README says:**", "", f"> {p['summary']}", ""]
        if p["flags"]:
            L += ["**Before linking this, fix:** " + "; ".join(p["flags"]), ""]
        L += [
            "**Proves:** <!-- the capability a hiring manager should conclude you have. "
            "Not 'Python' — something like 'can design an evaluation harness when there's no ground truth' -->",
            "",
            "**Best for:** <!-- which kinds of roles or requirements this is the strongest answer to -->",
            "",
            "**The one-liner:** <!-- how you'd describe it in a cover letter, in one sentence, "
            "leading with the outcome rather than the tech -->",
            "",
            "**The obvious follow-up question:** <!-- what an interviewer will poke at, and your honest answer -->",
            "",
            "---",
            "",
        ]
    return "\n".join(L)


def main():
    ap = argparse.ArgumentParser(description="Build a portfolio index skeleton from your repos.")
    ap.add_argument("paths", nargs="*", help="Local repo paths")
    ap.add_argument("--scan", metavar="DIR", help="Treat each git repo one level under DIR as a project")
    ap.add_argument("--github", action="store_true", help="Also pull repo metadata via the gh CLI")
    ap.add_argument("-o", "--output", default="portfolio-index.md")
    args = ap.parse_args()

    targets = list(args.paths)
    if args.scan:
        base = Path(args.scan).expanduser()
        targets += [str(d) for d in sorted(base.iterdir()) if (d / ".git").exists()]

    if not targets and not args.github:
        ap.error("give me some repo paths, --scan DIR, or --github")

    projects = []
    seen = set()
    for t in targets:
        print(f"  reading {t}", file=sys.stderr)
        p = profile_local(t)
        if p:
            projects.append(p)
            seen.add(p["name"])
        else:
            print(f"  skipped (not a directory): {t}", file=sys.stderr)

    if args.github:
        print("  querying gh…", file=sys.stderr)
        for p in profile_github():
            if p["name"] not in seen:   # local scan wins — it has more detail
                projects.append(p)

    if not projects:
        print("No projects found.", file=sys.stderr)
        sys.exit(1)

    projects.sort(key=lambda p: p["last_commit"] or "", reverse=True)
    Path(args.output).write_text(render(projects), encoding="utf-8")
    print(f"\n✅ {len(projects)} projects → {args.output}")
    print("   Now fill in the Proves / Best for / one-liner slots, then drop it into the skill's assets/.")


if __name__ == "__main__":
    main()
