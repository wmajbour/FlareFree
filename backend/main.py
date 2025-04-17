# main.py

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class UserInput(BaseModel):
    symptoms: str
    diet: str

@app.get("/")
def read_root():
    return {"message": "Welcome to FlareFree backend"}

@app.post("/recommendations")
def get_recommendations(user_input: UserInput):
    recommendations = [
        "Leafy greens (spinach, kale)",
        "Fatty fish (salmon, sardines)",
        "Whole grains (quinoa, oats)"
    ]

    return {
        "symptoms_received": user_input.symptoms,
        "diet_received": user_input.diet,
        "recommended_foods": recommendations
    }