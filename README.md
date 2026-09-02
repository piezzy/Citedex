# DRI-RAG

A Retrieval-Augmented Generation (RAG) system for question answering over the Digital Resource Identifier (DRI) project documentation.

DRI-RAG allows users to ask questions about the DRI project and receive answers grounded in the project's documentation, together with source citations.

---

## Overview

Project documentation can contain a large amount of information distributed across many pages. Finding specific information manually can be time-consuming.

DRI-RAG provides a conversational interface that allows users to query the project documentation using natural language.

The system retrieves relevant document sections, reranks them based on relevance, and uses a local Large Language Model (LLM) to generate a grounded answer with citations.

### Main Features

- Natural language question answering
- PDF document processing
- Semantic vector search
- Neighbor chunk expansion
- Cross-encoder reranking
- Grounded answer generation
- Source citation
- FastAPI backend
- React frontend
- Local LLM inference using Ollama
- Retrieval and reranking evaluation

---

# System Architecture

The complete system follows this pipeline:

```text
                         DRI Documentation
                                │
                                ▼
                         ┌─────────────┐
                         │  PyMuPDF    │
                         │ PDF Parsing │
                         └──────┬──────┘
                                │
                                ▼
                         31 Document Pages
                                │
                                ▼
                  ┌──────────────────────────┐
                  │ RecursiveCharacter       │
                  │ Text Splitter            │
                  └────────────┬─────────────┘
                               │
                               ▼
                           57 Chunks
                               │
                               ▼
                     ┌─────────────────┐
                     │     BGE-M3      │
                     │    Embedding    │
                     └────────┬────────┘
                              │
                              ▼
                        ┌───────────┐
                        │  Qdrant   │
                        │ Vector DB │
                        └─────┬─────┘
                              │
                         Top-10 Retrieval
                              │
                              ▼
                    Neighbor Expansion
                              │
                              ▼
                    ┌─────────────────┐
                    │ BGE Reranker    │
                    │    v2-m3        │
                    └────────┬────────┘
                             │
                          Top-3
                             │
                             ▼
                    Neighbor Expansion
                             │
                             ▼
                       Context Builder
                             │
                             ▼
                     ┌──────────────┐
                     │  Qwen3 8B   │
                     │ Local LLM   │
                     └──────┬───────┘
                            │
                            ▼
                    Answer + Citations
                            │
                            ▼
                         FastAPI
                            │
                            ▼
                       React Frontend
```

---

# RAG Pipeline

## 1. Document Processing

The source document is a PDF containing the DRI project documentation.

PDF pages are extracted using PyMuPDF.

The current document contains:

```text
31 pages
```

Each page is initially stored together with its page number and source document.

---

## 2. Chunking

The extracted document pages are split into smaller text segments using LangChain's `RecursiveCharacterTextSplitter`.

Current configuration:

```text
Chunk size     : 1000 characters
Chunk overlap  : 150 characters
```

The splitter uses paragraph and line boundaries before falling back to smaller separators.

The current document produces:

```text
57 chunks
```

Each chunk contains:

```json
{
  "chunk_id": "chunk_0000",
  "text": "...",
  "meta_data": {
    "source": "Laporan_Computing_Project_Kelompok_1.pdf",
    "page": 1
  }
}
```

The page metadata is preserved so that retrieved information can later be presented with source citations.

---

# Embedding

Each document chunk is converted into a vector representation using:

```text
BAAI/bge-m3
```

The model produces:

```text
1024-dimensional embeddings
```

The same embedding model is used to transform incoming user queries into vectors.

This allows the system to compare the semantic similarity between the user's question and document chunks.

---

# Vector Database

The generated embeddings are stored in:

```text
Qdrant
```

The collection used by the project is:

```text
dri_documents
```

Configuration:

```text
Vector size : 1024
Distance    : Cosine
```

Each vector contains payload metadata including:

- Document text
- Chunk ID
- Source document
- Page number

Qdrant is run locally using Docker.

---

# Retrieval

When a user submits a question, the query is first converted into an embedding using BGE-M3.

The vector is then searched against the `dri_documents` collection.

The initial retrieval stage returns:

```text
Top 10 chunks
```

The purpose of this stage is to provide a sufficiently large candidate pool for subsequent reranking.

---

# Neighbor Expansion

Document chunks can lose context when they are split into smaller segments.

To preserve surrounding information, the system expands retrieved chunks by including neighboring chunks.

For each selected chunk, the system can retrieve:

```text
previous chunk
current chunk
next chunk
```

This provides additional surrounding context before reranking.

Neighbor expansion is performed both:

1. After dense retrieval
2. After reranking

---

# Reranking

The initial vector search is followed by a second-stage relevance ranking using:

```text
BAAI/bge-reranker-v2-m3
```

The reranker evaluates the relevance between:

```text
User Query
      +
Retrieved Document
```

The expanded candidates are then sorted according to their reranking scores.

The system keeps the top:

```text
3 reranked results
```

This two-stage retrieval approach separates:

- fast candidate retrieval using vector similarity
- more detailed relevance scoring using a cross-encoder reranker

---

# Context Construction

The final retrieved chunks are converted into a structured context for the LLM.

Each source is assigned a citation number:

```text
[SOURCE 1]
Page: 12
Chunk: chunk_0025

...

[SOURCE 2]
Page: 12
Chunk: chunk_0026

...
```

The citation number allows the LLM to reference the retrieved information directly.

---

# LLM Generation

The final context is passed to:

```text
Qwen3 8B
```

The model runs locally through:

```text
Ollama
```

The LLM is instructed to:

- answer only using the provided context
- avoid unsupported assumptions
- avoid adding information not present in the retrieved documents
- cite factual statements
- use only citation numbers provided in the context
- explicitly state when information is unavailable

For unsupported questions, the system uses:

```text
Informasi tersebut tidak tersedia dalam dokumen.
```

---

# Citation System

DRI-RAG uses citation numbers to connect generated claims with retrieved document sources.

Example answer:

```text
Database yang digunakan dalam project DRI adalah MySQL [2].
MySQL digunakan untuk menyimpan data relasional seperti Registry
Identitas Sumber Daya, data jurnal, dan data paket berlangganan [3].
```

The backend then filters the retrieved sources based on citation numbers appearing in the generated answer.

The frontend displays the corresponding page information:

```text
Sources

[2] Page 12
[3] Page 12
```

This allows users to trace the generated answer back to the original documentation.

---

# Backend API

The backend is implemented using:

```text
FastAPI
```

## Endpoint

### `POST /ask`

Request:

```json
{
  "question": "Apa database yang digunakan dalam project DRI?"
}
```

Response:

```json
{
  "answer": "Database yang digunakan dalam project DRI adalah MySQL [2]. MySQL digunakan untuk menyimpan data relasional seperti Registry Identitas Sumber Daya, data jurnal, dan data paket berlangganan [3].",
  "sources": [
    {
      "citation": 2,
      "page": 12,
      "source": "Laporan_Computing_Project_Kelompok_1.pdf",
      "chunk_id": "chunk_0025"
    },
    {
      "citation": 3,
      "page": 12,
      "source": "Laporan_Computing_Project_Kelompok_1.pdf",
      "chunk_id": "chunk_0026"
    }
  ]
}
```

---

# Frontend

The frontend is implemented using:

- React
- TypeScript
- Vite
- Tailwind CSS
- Motion
- Lucide Icons

The frontend contains the DRI landing page and an interactive DRI Assistant chatbot.

The chatbot communicates with the FastAPI backend through:

```text
POST /ask
```

The interface displays:

- User questions
- Generated answers
- Loading state
- Source citations
- Retrieved page information
- Suggested questions

The chatbot is accessible through a floating button in the bottom-right corner of the page.

---

# Evaluation

The retrieval system was evaluated using 10 test cases with manually defined relevant chunks.

## Dense Retrieval

| Metric | Result |
|---|---:|
| Recall@1 | 60% |
| Recall@3 | 90% |
| Recall@5 | 100% |
| Recall@10 | 100% |

## Dense Retrieval + BGE Reranker

| Metric | Result |
|---|---:|
| Recall@1 | **90%** |
| Recall@3 | **100%** |
| Recall@5 | **100%** |
| Recall@10 | **100%** |

### Evaluation Analysis

The reranker substantially improved the ranking of relevant documents.

Recall@1 increased from:

```text
60% → 90%
```

while Recall@3 increased from:

```text
90% → 100%
```

This indicates that the reranker was particularly effective at moving relevant chunks toward the top of the retrieved results.

Recall@5 and Recall@10 remained at 100%, showing that dense retrieval already provided sufficient candidate coverage for the evaluation dataset.

---

# Generation Evaluation

A baseline generation evaluation was also performed using five test cases.

The evaluator checks:

- whether generated answers contain valid citations
- whether cited source numbers exist in the returned sources
- whether an answer and sources are present

Current baseline results:

| Metric | Result |
|---|---:|
| Citation Correctness | 100% |
| Grounded Rate | 100% |

However, this evaluation uses a rule-based heuristic.

It does **not** perform semantic verification of whether every generated claim is actually supported by the cited document content.

Therefore, the results should be interpreted as a citation/response validity baseline rather than a complete semantic faithfulness evaluation.

---

# Example Questions

The chatbot can answer questions such as:

```text
Apa database yang digunakan dalam project DRI?
```

Example:

```text
Database yang digunakan dalam project DRI adalah MySQL [2].
```

It can also answer questions requiring information from multiple retrieved chunks:

```text
Bagaimana resolver DRI bekerja?
```

For questions outside the available documentation:

```text
Apakah project DRI menggunakan MongoDB?
```

The system responds:

```text
Informasi tersebut tidak tersedia dalam dokumen.
```

---

# Project Structure

```text
DRI-RAG/
│
├── app/
│   ├── api/
│   │   ├── __init__.py
│   │   └── main.py
│   │
│   ├── embeddings/
│   │   └── embedder.py
│   │
│   ├── ingestion/
│   │   ├── create_chunks.py
│   │   ├── chunker.py
│   │   └── ...
│   │
│   ├── retrieval/
│   │   └── reranker.py
│   │
│   ├── vectorstore/
│   │   └── qdrant_store.py
│   │
│   ├── llm/
│   │   └── llm.py
│   │
│   └── rag/
│       └── rag.py
│
├── data/
│   ├── raw/
│   └── processed/
│       ├── documents.json
│       └── chunks.json
│
├── evaluation/
│   ├── test_cases.json
│   ├── retrieval_test_cases.json
│   ├── retrieval_eval.py
│   ├── reranker_eval.py
│   ├── generation_eval.py
│   └── results/
│       ├── retrieval_results.json
│       └── reranker_results.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   └── components/
│   │   │       ├── DRIRAGShowcase.tsx
│   │   │       ├── ChatbotOverlay.tsx
│   │   │       └── ...
│   │   └── ...
│   │
│   └── package.json
│
├── requirements.txt
└── README.md
```

---

# Installation

## Requirements

Make sure the following are installed:

- Python 3.x
- Node.js
- Docker
- Ollama

---

## 1. Clone Repository

```bash
git clone <repository-url>
cd DRI-RAG
```

---

## 2. Create Python Environment

```powershell
python -m venv .venv
```

Activate the environment:

```powershell
.venv\Scripts\activate
```

Install Python dependencies:

```powershell
pip install -r requirements.txt
```

---

# 3. Run Qdrant

Start the Qdrant Docker container:

```powershell
docker run -d `
  --name dri-qdrant `
  -p 6333:6333 `
  -p 6334:6334 `
  -v C:\qdrant-storage:/qdrant/storage `
  qdrant/qdrant
```

The Qdrant API will be available at:

```text
http://localhost:6333
```

---

# 4. Run Ollama

Make sure Ollama is installed and download the model:

```powershell
ollama pull qwen3:8b
```

Start Ollama:

```powershell
ollama serve
```

If GPU/CUDA inference causes an initialization error, the model can be run using the CPU backend:

```powershell
$env:OLLAMA_LLM_LIBRARY="cpu"
ollama serve
```

---

# 5. Prepare Documents

Run the document ingestion pipeline to create chunks:

```powershell
cd app
python ingestion/create_chunks.py
```

This generates:

```text
data/processed/chunks.json
```

The chunks can then be embedded and indexed into Qdrant using the project's vector indexing process.

---

# 6. Run FastAPI

From the `app` directory:

```powershell
uvicorn api.main:app --reload
```

The API will run at:

```text
http://127.0.0.1:8000
```

Interactive API documentation:

```text
http://127.0.0.1:8000/docs
```

---

# 7. Run Frontend

Open another terminal:

```powershell
cd frontend
npm install
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

# End-to-End Request Flow

When a user asks a question through the chatbot:

```text
1. User enters a question
            ↓
2. React sends POST /ask
            ↓
3. FastAPI receives the question
            ↓
4. BGE-M3 embeds the query
            ↓
5. Qdrant retrieves top-10 chunks
            ↓
6. Neighbor chunks are added
            ↓
7. BGE Reranker scores candidates
            ↓
8. Top-3 results are selected
            ↓
9. Neighbor chunks are expanded again
            ↓
10. Retrieved chunks become LLM context
            ↓
11. Qwen3 8B generates the answer
            ↓
12. Citation numbers are extracted
            ↓
13. Cited sources are returned by FastAPI
            ↓
14. React displays answer + sources
```

---

# Technology Stack

| Component | Technology |
|---|---|
| Programming Language | Python |
| PDF Processing | PyMuPDF |
| Text Chunking | LangChain RecursiveCharacterTextSplitter |
| Embedding Model | BAAI/bge-m3 |
| Vector Database | Qdrant |
| Reranker | BAAI/bge-reranker-v2-m3 |
| LLM | Qwen3 8B |
| LLM Runtime | Ollama |
| Backend | FastAPI |
| Frontend | React + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| UI Animation | Motion |
| Containerization | Docker |

---

# Design Considerations

## Two-Stage Retrieval

The system separates retrieval into two stages:

```text
Dense Retrieval
      ↓
Candidate Selection
      ↓
Cross-Encoder Reranking
      ↓
Final Context
```

This allows the vector database to efficiently retrieve candidates while the reranker performs more detailed relevance scoring.

## Neighbor Expansion

Neighbor expansion is used to reduce the loss of context caused by document chunking.

Instead of relying exclusively on an isolated chunk, surrounding chunks can also contribute to the final context.

## Grounded Generation

The LLM is explicitly instructed to rely only on retrieved context.

If the required information cannot be found in the context, the model should return:

```text
Informasi tersebut tidak tersedia dalam dokumen.
```

This reduces unsupported responses and makes the system more suitable for document-based question answering.

---

# Limitations

Current limitations include:

- The source corpus is currently based on a single project document.
- Generation evaluation uses a rule-based heuristic rather than a semantic faithfulness evaluator.
- Local LLM inference can be slow when running on CPU.
- Citation verification currently validates citation references but does not fully verify semantic claim-to-source alignment.
- The system currently focuses on document-based question answering rather than general-purpose conversational assistance.

---

# Future Improvements

Potential improvements include:

- Semantic faithfulness evaluation
- Larger document collections
- Hybrid keyword + vector retrieval
- Better source highlighting
- Streaming LLM responses
- Conversation memory
- Document upload through the web interface
- Authentication and multi-user support
- Production deployment
- GPU-optimized local inference

---

# Project Goal

DRI-RAG was developed as an end-to-end implementation of a Retrieval-Augmented Generation system for the Digital Resource Identifier project.

The project focuses not only on generating answers with an LLM, but also on:

- retrieving relevant information
- improving retrieval ranking
- preserving document context
- grounding generated responses
- providing source citations
- evaluating retrieval performance
- integrating the RAG system into a web application

The resulting system combines information retrieval, vector databases, reranking, local LLM inference, backend API development, and frontend integration into a single application.
