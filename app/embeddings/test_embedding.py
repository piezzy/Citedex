from embedder import Embedder

def main():
    embedder = Embedder()
    
    text = "Apa fungsi resolver pada sistem DRI?"
    
    vector = embedder.embed_query(text)
    
    print("success")
    print(f"vector length: {len(vector)}")
    print(f"vector 10 values: {vector[:10]}")
    
if __name__ == "__main__":
    main()