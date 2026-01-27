import fitz  # PyMuPDF
import json

def extract_toc(pdf_path):
    """Extract table of contents from a PDF file."""
    doc = fitz.open(pdf_path)
    
    # Get the built-in table of contents/bookmarks
    toc = doc.get_toc(simple=False)
    
    if toc:
        print("=== Extracted Table of Contents ===\n")
        toc_data = []
        for item in toc:
            level, title, page = item[0], item[1], item[2]
            indent = "  " * (level - 1)
            print(f"{indent}{title} (Page {page})")
            toc_data.append({
                "level": level,
                "title": title,
                "page": page
            })
        
        # Save to JSON
        with open("toc.json", "w", encoding="utf-8") as f:
            json.dump(toc_data, f, indent=2, ensure_ascii=False)
        print(f"\nSaved to toc.json")
        return toc_data
    else:
        print("No TOC bookmarks found. Searching for TOC page content...")
        
        # Try to find TOC content in the first few pages
        for page_num in range(min(15, len(doc))):
            page = doc[page_num]
            text = page.get_text()
            if "contents" in text.lower() or "table of contents" in text.lower():
                print(f"\n=== Page {page_num + 1} content ===\n")
                print(text[:5000])
                break
    
    doc.close()
    return []

if __name__ == "__main__":
    extract_toc("Dataton_WATCHOUT_Users_Guide.pdf")
