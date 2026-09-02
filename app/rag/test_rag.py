from rag import RAG


def main():

    rag = RAG()

    query = "Teknologi apa saja yang digunakan dalam project DRI?"

    answer, sources = rag.ask(query)

    print(f"\nanswer:\n {answer}")

    print("\nsources:")
    for source in sources:
        print(
            f"[{source['citation']}] "
            f"page: {source['page']} | "
            f"chunk: {source['chunk_id']}"
        )


if __name__ == "__main__":
    main()