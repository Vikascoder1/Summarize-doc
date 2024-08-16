# Document Summarizer App

---

## 1. **Instructions for Setting Up and Running the Application Locally**

### Prerequisites

- **Python 3.8+** installed
- **Node.js** and **npm** installed
- **Git** installed

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd doc_summarizer/backend


Create a virtual environment:
python -m venv myenv
Activate the virtual environment

Install the required Python packages:
Copy code
pip install -r requirements.txt

Run the backend server:
uvicorn main:app --reload
The backend server will start running at http://127.0.0.1:8000.

********************************************************************************


Frontend Setup
Navigate to the frontend directory:

cd ../frontend
Install frontend dependencies:
npm install
Start the React development server:

npm start
The frontend should be available at http://localhost:3000.

Connecting Frontend with Backend

Ensure that the frontend is configured to make requests to the backend server running on http://127.0.0.1:8000.

********************************************************************************

Project Documentation
Approach
Tech Stack:

Backend: FastAPI for handling API requests.
Frontend: React.js for creating a user-friendly interface.
File handling: FastAPI's UploadFile for file uploads.
Text Summarization: Utilized Python libraries for processing text.
Development Process:

Set up the backend using FastAPI to handle file uploads and return summaries.
Built the frontend using React to allow users to upload documents and display the summarized content.
Integrated the frontend with the backend to create a seamless document summarization experience.

********************************************************************************

Challenges Faced
File Handling:

Challenge: Handling various file formats (PDF, DOCX) and extracting text.
Solution: Utilized libraries like PyMuPDF and python-docx for text extraction from PDFs and DOCX files, respectively.
Cross-Origin Resource Sharing (CORS):

Challenge: The frontend and backend were on different origins, causing CORS issues.
Solution: Configured CORS in FastAPI to allow requests from the frontend origin.
Deployment:

Challenge: Ensuring the backend and frontend worked together smoothly in a deployed environment.
Solution: Deployed the frontend on Vercel and connected it to the backend deployed on Render/Heroku.
Overcoming the Challenges
Collaboration and Iterative Testing: Ensured both frontend and backend components worked together through constant testing and debugging.
Community Resources: Leveraged documentation and forums to solve specific issues, especially around deployment and CORS configurations.

********************************************************************************

3. Bibliography
Libraries and Tools Used
FastAPI: The web framework used for building the backend.

FastAPI Documentation
React.js: The JavaScript library used for building the frontend.

React.js Documentation
PyMuPDF: Used for extracting text from PDF documents.

PyMuPDF Documentation
python-docx: Used for extracting text from DOCX files.

python-docx Documentation
Vercel: Platform used for deploying the frontend.

Vercel Documentation
Render/Heroku: Platforms considered/used for deploying the backend.

Render Documentation
Heroku Documentation

********************************************************************************
