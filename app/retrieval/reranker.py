from FlagEmbedding import FlagReranker

MODEL_NAME = "BAAI/bge-reranker-v2-m3"

class Reranker:
    def __init__(self):
        self.model = FlagReranker(
            MODEL_NAME,
            use_fp16=True
        )
    print(f"{MODEL_NAME} loaded successfully")
    
    def rerank(self, query, documents, top_k=3):

        scored_documents = []

        for document in documents:

            score = self.model.compute_score(
                [query, document],
                normalize=True
            )

            scored_documents.append(
                (document, score)
            )

        scored_documents.sort(
            key=lambda x: x[1],
            reverse=True
        )

        return scored_documents[:top_k]