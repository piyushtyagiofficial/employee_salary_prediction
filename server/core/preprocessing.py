import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler
import joblib
import os

# Global variables to store preprocessing objects
scaler = None
label_encoders = {}
feature_columns = []

def load_preprocessing_objects():
    """Load saved preprocessing objects"""
    global scaler, label_encoders, feature_columns
    
    try:
        if os.path.exists('scaler.pkl'):
            scaler = joblib.load('scaler.pkl')
            print("✅ Scaler loaded successfully")
        else:
            print("⚠️ scaler.pkl not found")
            return False
            
        # For the notebook model, we don't need separate label encoders
        # as they were applied during training and saved with the model
        
        # Define feature columns based on the notebook preprocessing
        feature_columns = [
            'age', 'workclass', 'educational-num', 'marital-status', 
            'occupation', 'relationship', 'race', 'gender', 
            'capital-gain', 'capital-loss', 'hours-per-week', 'native-country'
        ]
        
        return True
    except Exception as e:
        print(f"Error loading preprocessing objects: {e}")
        return False

def preprocess_data(df):
    """Preprocess the data for prediction based on notebook approach"""
    global scaler, feature_columns
    
    # Make a copy to avoid modifying original data
    data = df.copy()
    
    # Create label encoders for categorical variables (same as notebook)
    categorical_mappings = {
        'workclass': {
            'Private': 0, 'Self-emp-not-inc': 1, 'Self-emp-inc': 2, 
            'Federal-gov': 3, 'Local-gov': 4, 'State-gov': 5, 'Others': 6
        },
        'marital-status': {
            'Married-civ-spouse': 0, 'Divorced': 1, 'Never-married': 2,
            'Separated': 3, 'Widowed': 4, 'Married-spouse-absent': 5,
            'Married-AF-spouse': 6
        },
        'occupation': {
            'Tech-support': 0, 'Craft-repair': 1, 'Other-service': 2,
            'Sales': 3, 'Exec-managerial': 4, 'Prof-specialty': 5,
            'Handlers-cleaners': 6, 'Machine-op-inspct': 7, 'Adm-clerical': 8,
            'Farming-fishing': 9, 'Transport-moving': 10, 'Priv-house-serv': 11,
            'Protective-serv': 12, 'Armed-Forces': 13, 'Others': 14
        },
        'relationship': {
            'Wife': 0, 'Own-child': 1, 'Husband': 2, 'Not-in-family': 3,
            'Other-relative': 4, 'Unmarried': 5
        },
        'race': {
            'White': 0, 'Asian-Pac-Islander': 1, 'Amer-Indian-Eskimo': 2,
            'Other': 3, 'Black': 4
        },
        'gender': {
            'Female': 0, 'Male': 1
        },
        'native-country': {
            'United-States': 0, 'Cambodia': 1, 'England': 2, 'Puerto-Rico': 3,
            'Canada': 4, 'Germany': 5, 'India': 6, 'Japan': 7, 'Greece': 8,
            'China': 9, 'Cuba': 10, 'Iran': 11, 'Honduras': 12, 'Philippines': 13,
            'Italy': 14, 'Poland': 15, 'Jamaica': 16, 'Vietnam': 17, 'Mexico': 18,
            'Portugal': 19, 'Ireland': 20, 'France': 21, 'Dominican-Republic': 22,
            'Others': 23
        }
    }
    
    # Apply label encoding
    for col, mapping in categorical_mappings.items():
        if col in data.columns:
            # Handle unknown categories by mapping to 'Others' or last category
            data[col] = data[col].map(mapping).fillna(len(mapping) - 1)
    
    # Ensure same feature order as training
    X = data.reindex(columns=feature_columns, fill_value=0)
    
    # Scale features
    if scaler is not None:
        X_scaled = scaler.transform(X)
        return X_scaled
    else:
        return X.values

def initialize_preprocessing():
    """Initialize preprocessing objects on startup"""
    return load_preprocessing_objects()