from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from rag.rag import RAG

app = FastAPI(
    title="DRI RAG API",
    description="API for DRI RAG",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuestionRequest(BaseModel):
    question: str = Field(
        ...,
        min_length=1,
        description="The question to ask the DRI project."
    )
    
class Source(BaseModel):
    citation: int
    page: int
    source: str
    chunk_id: str
    
class QuestionResponse(BaseModel):
    answer: str
    sources: list[Source]
    
rag = RAG()

@app.get("/")
def root():
    return {
        "message": "DRI RAG API is running."
    }

@app.post("/ask", response_model=QuestionResponse)
def ask_question(request: QuestionRequest):
    try:
        answer, sources = rag.ask(request.question)

        formatted_sources = [
            {
                "citation": int(source["citation"]),
                "page": int(source["page"]),
                "source": source["source"],
                "chunk_id": source["chunk_id"]
            }
            for source in sources
        ]

        return {
            "answer": answer,
            "sources": formatted_sources
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process question: {str(e)}"
        )