from rag import RAG


def main():

    rag = RAG()

    query = "Teknologi apa saja yang digunakan dalam project DRI?"

    answer, sources = rag.ask(query)

    print(f"\nanswer: {answer}")

    print("\nsources:")

    for i, result in enumerate(sources, start=1):

        print(f"[{i}] score: {result['score']:.4f}")
        print(f"page: {result['page']}")
        print(f"source: {result['source']}")
        print(f"chunk id: {result['chunk_id']}")
        print(f"document:\n{result['text'][:300]}")

        print("-" * 80)


if __name__ == "__main__":
    main()