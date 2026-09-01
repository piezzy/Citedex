from FlagEmbedding import FlagReranker

MODEL_NAME = "BAAI/bge-reranker-v2-m3"

class Reranker:
    def __init__(self):
        self.model = FlagReranker(
            MODEL_NAME,
            use_fp16=True
        )
    print(f"{MODEL_NAME} loaded successfully")
    
    def rerank(self, query, results, top_k=3):

        scored_results = []

        for result in results:
            
            document = result.payload['text']
            
            score = self.model.compute_score(
                [query, document],
                normalize=True
            )
            
            scored_results.append(
                {
                    "text": document,
                    "score": score[0],
                    "chunk_id": result.payload['chunk_id'],
                    "source": result.payload['source'],
                    "page": result.payload['page']
                }
            )
        
        scored_results.sort(
            key=lambda x: x['score'],
            reverse=True
        )

        return scored_results[:top_k]