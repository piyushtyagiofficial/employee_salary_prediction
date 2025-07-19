from pydantic import BaseModel, Field
from typing import Dict

class PredictionRequest(BaseModel):
    age: int = Field(..., ge=17, le=75, description="Age of the person")
    workclass: str = Field(..., description="Type of employment (e.g. Private, Self-emp, Govt)")
    educational_num: int = Field(..., ge=1, le=16, description="Years of education")
    marital_status: str = Field(..., description="Marital status (e.g. Married, Single)")
    occupation: str = Field(..., description="Occupation (e.g. Tech-support, Sales)")
    relationship: str = Field(..., description="Relationship (e.g. Husband, Not-in-family)")
    race: str = Field(..., description="Race category (e.g. White, Black)")
    gender: str = Field(..., description="Gender (e.g. Male, Female)")
    hours_per_week: int = Field(..., ge=1, le=99, description="Working hours per week")
    native_country: str = Field(..., description="Country of origin")

class PredictionResponse(BaseModel):
    success: bool
    prediction: str
    probabilities: Dict[str, float]
    confidence: float

class ModelInfoResponse(BaseModel):
    model_trained: bool
    model_type: str = None
    features_count: int = None
    accuracy: float = None
