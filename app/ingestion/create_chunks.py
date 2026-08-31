import json
from pathlib import Path
from chunker import chunk_documents

BASE_DIR = Path(__file__).resolve().parents[2]

INPUT_PATH = BASE_DIR / "data" / "processed" / "documents.json"
OUTPUT_PATH = BASE_DIR / "data" / "processed" / "chunks.json"

def main():
    with open(INPUT_PATH, "r", encoding="utf-8") as f:
        documents = json.load(f)
        
    chunks = chunk_documents(documents)
    
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(chunks, f, ensure_ascii=False, indent=2)
        
    print(f"pages loaded: {len(documents)}")
    print(f"chunks created: {len(chunks)}")
    print(f"chunks saved to {OUTPUT_PATH}")
    
if __name__ == "__main__":
    main()