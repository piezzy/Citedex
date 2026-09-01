from rag import RAG

def main():
    rag = RAG()
    
    query = "Teknologi apa saja yang digunakan dalam project DRI?"
    
    answer, sources = rag.ask(query)
    
    print(f"answer: {answer}")
    
    print("sources:")
    
    for i, (document, score) in enumerate(
        sources, start=1
    ):
        print(f"[{i}] score: {score[0]:.4f}")
        print(f"document:\n{document[:300]}")
        print("-" * 80)
        
if __name__ == "__main__":
    main()