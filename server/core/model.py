import joblib
import os
import numpy as np
from sklearn.ensemble import GradientBoostingClassifier

# Global variable to store model
model = None

def load_model():
    """Load the trained model"""
    global model
    
    try:
        if os.path.exists('employee_salary_prediction.pkl'):
            model = joblib.load('employee_salary_prediction.pkl')
            print("✅ Model loaded successfully")
            return True
        else:
            print("⚠️ employee_salary_prediction.pkl not found")
            return False
    except Exception as e:
        print(f"Error loading model: {e}")
        return False

def predict(X):
    """Make prediction using the loaded model"""
    global model
    
    if model is None:
        raise ValueError("Model not loaded")
    
    # Make prediction
    prediction = model.predict(X)[0]
    prediction_proba = model.predict_proba(X)[0]
    
    # Convert prediction to readable format
    # 0 = <=50K, 1 = >50K (based on notebook encoding)
    prediction_label = '>50K' if prediction == 1 else '<=50K'
    
    # Get probabilities
    probabilities = {
        '<=50K': float(prediction_proba[0]),
        '>50K': float(prediction_proba[1])
    }
    
    confidence = float(max(prediction_proba))
    
    return prediction_label, probabilities, confidence

def get_model_info():
    """Get information about the loaded model"""
    global model
    
    if model is None:
        return {
            'model_trained': False,
            'model_type': None,
            'features_count': None,
            'accuracy': None
        }
    
    return {
        'model_trained': True,
        'model_type': 'Gradient Boosting Classifier',
        'features_count': model.n_features_in_ if hasattr(model, 'n_features_in_') else 12,
        'accuracy': 0.8783  # From notebook results: 87.83%
    }

def initialize_model():
    """Initialize model on startup"""
    return load_model()