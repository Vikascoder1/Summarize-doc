from fastapi import FastAPI
from upload import upload_file
from summarize import summarize_document

app = FastAPI()

@app.post("/api/upload")
async def upload(file: UploadFile = File(...)):
    return await upload_file(file)

@app.post("/api/summarize")
async def summarize(file_name: str):
    return summarize_document(file_name)
