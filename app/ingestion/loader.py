import fitz 

def load_pdf(pdf_path: str):
    document = fitz.open(pdf_path)
    
    pages = []
    
    for page_number, page in enumerate(document, start=1):
        text = page.get_text()
        pages.append({
            "page": page_number,
            "text": text
        })
    
    document.close()
    
    return pages