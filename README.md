# Luke Panaccio Portfolio

A modern, responsive portfolio site built with Astro, showcasing instructional design and AI-powered learning projects.

## 🚀 Tech Stack

- **Framework**: [Astro](https://astro.build)
- **Styling**: Tailwind CSS
- **Content**: MDX (Markdown with Components)
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
luke-portfolio/
├── src/
│   ├── components/       # UI Components (Header, Footer, ProjectCard)
│   ├── layouts/          # Page layouts (Layout, ProjectLayout)
│   ├── pages/            # Routes
│   │   ├── projects/     # Project content files (.mdx)
│   │   ├── index.astro   # Homepage (contains project list data)
│   │   └── about.astro   # About page content
│   └── styles/           # Global styles
├── public/               # Static assets (images, resume PDF)
└── astro.config.mjs      # Configuration
```

## 🛠️ Maintenance Guide

### 1. Adding a New Portfolio Page

1.  **Create the Content File**:
    -   Duplicate an existing project file in `src/pages/projects/` (e.g., `zen-electron.mdx`).
    -   Rename it to your new project slug (e.g., `new-project.mdx`).
    -   Update the frontmatter (top section between `---`) with the new project details.
    -   Write your content using Markdown/MDX below the frontmatter.

2.  **Add to Homepage List**:
    -   Open `src/pages/index.astro`.
    -   Locate the `projects` array in the frontmatter script.
    -   Add a new object to the array:
        ```javascript
        {
          title: 'New Project Title',
          description: 'Short description for the card.',
          image: '/portfolio/images/new-project-hero.webp', // Make sure image exists in public/images/
          href: '/portfolio/projects/new-project', // Matches the filename created in step 1
          tags: ['Tag1', 'Tag2']
        },
        ```

### 2. Changing the Featured Project

1.  Open `src/pages/index.astro`.
2.  Locate the `featuredProject` object in the frontmatter.
3.  Update the fields (`title`, `description`, `image`, `href`, `tags`) to point to the project you want to highlight.

### 3. Updating "About Me"

-   **Bio & Story**: Edit the text within the `<section>` tags in `src/pages/about.astro`.
-   **Timeline**: Update the `timeline` array in the frontmatter of `src/pages/about.astro`.

### 4. Updating Resume

1.  Place your new PDF (e.g., `luke-cv-2026.pdf`) in the `public/` folder.
2.  Open `src/components/Footer.astro`.
3.  Find the "Resume" link in the `Quick Links` section and update the `href` to point to the new filename.

### 5. Updating Contact Details

Contact details appear in two places:
1.  **Footer**: Edit `src/components/Footer.astro` (check the `socialLinks` array and the email link at the bottom).
2.  **About Page**: Edit `src/pages/about.astro` (check the "Let's work together" section).

## 🎨 Frontend Refresh Advice

You can significantly change the look and feel of the site without touching the content (MDX files) or the data structures.

1.  **Theme & Colors**:
    -   Edit `tailwind.config.mjs` to change the color palette (`colors` object). This will globally update the primary, secondary, and accent colors used throughout the site.
    -   Update the CSS variables in the `<style>` block in `src/layouts/Layout.astro` (or `src/styles/global.css` if you extract them).

2.  **Typography**:
    -   Change the fonts imported in `src/layouts/Layout.astro`.
    -   Update the `fontFamily` settings in `tailwind.config.mjs`.

3.  **Layout & Components**:
    -   Modify `src/components/ProjectCard.astro` to change how project cards look (e.g., different hover effects, layout).
    -   Update `src/layouts/ProjectLayout.astro` to redesign the project detail pages (e.g., wider text column, different hero section).

4.  **Animations**:
    -   Astro supports **View Transitions**. You can enable them in `src/layouts/Layout.astro` for smooth navigation between pages.
    -   Add scroll animations using libraries like `aos` or simple CSS intersection observers in your components.

## 🚀 Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```
