from fastapi import APIRouter, HTTPException
import pandas as pd
from models.schemas import PredictionRequest, PredictionResponse, ModelInfoResponse
from core.model import predict, get_model_info
from core.preprocessing import preprocess_data

router = APIRouter()

@router.post("/predict", response_model=PredictionResponse)
async def predict_income(request: PredictionRequest):
    """Make prediction using trained model"""
    
    try:
        # Convert request to dictionary with proper field names
        input_data = {
            'age': request.age,
            'workclass': request.workclass,
            'educational-num': request.educational_num,
            'marital-status': request.marital_status,
            'occupation': request.occupation,
            'relationship': request.relationship,
            'race': request.race,
            'gender': request.gender,
            'capital-gain': 0,
            'capital-loss': 0,
            'hours-per-week': request.hours_per_week,
            'native-country': request.native_country
        }
        
        # Create DataFrame from input
        df = pd.DataFrame([input_data])
        
        # Preprocess input data
        X_scaled = preprocess_data(df)
        
        # Make prediction
        prediction, probabilities, confidence = predict(X_scaled)
        
        return PredictionResponse(
            success=True,
            prediction=prediction,
            probabilities=probabilities,
            confidence=confidence
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@router.get("/model-info", response_model=ModelInfoResponse)
async def model_info():
    """Get information about the trained model"""
    try:
        info = get_model_info()
        return ModelInfoResponse(**info)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "Employee Salary Prediction API is running"}