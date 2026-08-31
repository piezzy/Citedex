import json
from pathlib import Path

from loader import load_pdf

BASE_DIR = Path(__file__).resolve().parents[2]

PDF_PATH = BASE_DIR / "data" / "raw" / "Laporan_Computing_Project_Kelompok_1.pdf"
OUTPUT_PATH = BASE_DIR / "data" / "processed" / "documents.json"

def main():
    pages = load_pdf(PDF_PATH)
    
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(pages, f, ensure_ascii=False, indent=2)
        
    print(f"extracted {len(pages)} pages")
    print(f"saved to {OUTPUT_PATH}")
    
if __name__ == "__main__":
    main()