from pypdf import PdfReader

reader = PdfReader("/Users/lukepanaccio/Documents/GitHub/id-portfolio/job-applications/Success Profile - Senior Manager, Learning Design - Pitcher Partners.pdf")
text = ""
for page in reader.pages:
    text += page.extract_text() + "\n"

print(text)