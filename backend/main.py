# main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

class UserInput(BaseModel):
    symptoms: str
    diet: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, PUT, DELETE, OPTIONS)
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
def read_root():
    return {"message": "Welcome to FlareFree backend"}

@app.get("/ping")
def ping():
    return {"ping": "Pong!"}

@app.api_route("/recommendations", methods=["GET", "POST", "OPTIONS"])
def get_recommendations(user_input: UserInput):

    symptoms_based = []
    diet_restrictions = []

    if "fatigue" in user_input.symptoms.lower():
        symptoms_based.append("Celery juice")
        symptoms_based.append("Ginger tea")
    if "joint pain" in user_input.symptoms.lower():
        symptoms_based.append("Turmeric latte")
        symptoms_based.append("Bone broth")
    if "bloating" in user_input.symptoms.lower():
        symptoms_based.append("Peppermint tea")
        symptoms_based.append("Probiotic yogurt")
    if "nausea" in user_input.symptoms.lower():
        symptoms_based.append("Ginger ale")
        symptoms_based.append("Banana smoothie")
    if "headache" in user_input.symptoms.lower():
        symptoms_based.append("Peppermint tea")
        symptoms_based.append("Dark chocolate")
    if "skin rash" in user_input.symptoms.lower():  
        symptoms_based.append("Aloe vera juice")
        symptoms_based.append("Coconut water")

    if "gluten" in user_input.diet.lower():
        diet_restrictions.append("Quinoa salad")
        diet_restrictions.append("Rice cakes")
    if "dairy" in user_input.diet.lower():
        diet_restrictions.append("Almond milk")
        diet_restrictions.append("Coconut yogurt")
    if "sugar" in user_input.diet.lower():
        diet_restrictions.append("Stevia-sweetened snacks")
        diet_restrictions.append("Fruit smoothies")
    if "nuts" in user_input.diet.lower():
        diet_restrictions.append("Nut-free granola")
        diet_restrictions.append("Pumpkin seeds")

    recommendations = list(set(symptoms_based + diet_restrictions))

    if not recommendations:
        recommendations = ["No specific recommendations available."]

    return {
        "symptoms_received": user_input.symptoms,
        "diet_received": user_input.diet,
        "recommended_foods": recommendations
    }