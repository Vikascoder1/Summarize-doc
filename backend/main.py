from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from summarize import summarize_document

app = FastAPI()

# Allow CORS from all origins for development purposes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define a Pydantic model for the summarize request
class SummarizeRequest(BaseModel):
    file_name: str

# Route to handle file upload
@app.post("/api/upload")
async def upload(file: UploadFile = File(...)):
    try:
        file_name = await save_file(file)
        return {"filename": file_name}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Route to handle document summarization
@app.post("/api/summarize")
async def summarize(request: SummarizeRequest):
    try:
        summary = summarize_document(request.file_name)
        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Function to save the uploaded file
async def save_file(upload_file: UploadFile) -> str:
    try:
        file_path = f"uploads/{upload_file.filename}"
        with open(file_path, "wb") as file:
            file.write(await upload_file.read())
        return upload_file.filename
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# from fastapi import FastAPI, UploadFile, File, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from upload import save_file
# from summarize import summarize_document

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.post("/api/upload")
# async def upload(file: UploadFile = File(...)):
#     try:
#         file_name = await save_file(file)
#         return {"filename": file_name}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# @app.post("/api/summarize")
# async def summarize(file_name: str):
#     try:
#         summary = summarize_document(file_name)
#         return {"summary": summary}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)
