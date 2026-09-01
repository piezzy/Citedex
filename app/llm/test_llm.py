from llm import LLM

def main():
    llm = LLM()
    
    prompt="""
    Kamu adalah asisten yang menjawab dengan singkat.

    Pertanyaan:
    Apa itu Digital Resource Identifier (DRI)?
    """
    answer = llm.generate(prompt)
    print(f"answer: {answer}")
    
if __name__ == "__main__":
    main()