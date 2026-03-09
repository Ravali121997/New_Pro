from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow React to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    username: str
    password: str


class ForgotPassword(BaseModel):
    email: str


@app.post("/login")
def login(data: LoginRequest):
    
    # simple sample login check
    if data.username == "admin" and data.password == "1234":
        return {"status": "success", "message": "Login successful"}
    
    return {"status": "error", "message": "Invalid username or password"}


@app.post("/forgot-password")
def forgot_password(data: ForgotPassword):

    # Normally you would send email reset link here

    return {
        "message": f"Password reset link sent to {data.email}"
    }