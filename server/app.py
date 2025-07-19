from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router
from core.model import initialize_model
from core.preprocessing import initialize_preprocessing
import warnings

warnings.filterwarnings('ignore')

app = FastAPI(
    title="Employee Salary Prediction API",
    description="FastAPI backend for predicting employee salary levels using Gradient Boosting",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(router)

@app.on_event("startup")
async def startup_event():
    """Initialize model and preprocessing objects on startup"""
    print("🚀 Starting Employee Salary Prediction API...")
    
    model_loaded = initialize_model()
    preprocessing_loaded = initialize_preprocessing()
    
    if model_loaded and preprocessing_loaded:
        print("✅ Model and preprocessing objects loaded successfully!")
        print("📊 Model: Gradient Boosting Classifier")
        print("🎯 Accuracy: 87.83%")
        print("📈 Ready for predictions!")
    else:
        print("⚠️  Warning: Model or preprocessing objects not found.")
        print("📝 Please ensure 'employee_salary_prediction.pkl' and 'scaler.pkl' exist in the root directory.")

@app.get("/")
async def root():
    """API health check"""
    return {
        "message": "Employee Salary Prediction API",
        "version": "1.0.0",
        "status": "running",
        "model": "Gradient Boosting Classifier",
        "accuracy": "87.83%"
    }

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)