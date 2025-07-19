# Employee Salary Prediction

A full-stack machine learning application that predicts whether an individual's income exceeds $50K per year based on demographic and employment information. The project uses a Gradient Boosting Classifier for predictions and provides a modern web interface built with React and FastAPI.

## 🚀 Features

- **Machine Learning Model**: Gradient Boosting Classifier with high accuracy
- **Interactive Web Interface**: Modern React frontend with Tailwind CSS
- **Real-time Predictions**: Fast API backend for instant results
- **Comprehensive Input Fields**: Age, work class, education, marital status, occupation, and more
- **Visual Results**: Clear prediction display with confidence scores and probability distribution



## 🛠️ Tech Stack

### Frontend
- **React 19**: Modern UI library
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons
- **Axios**: HTTP client for API requests

### Backend
- **FastAPI**: High-performance Python web framework
- **Scikit-learn**: Machine learning library
- **Gradient Boosting Classifier**: Primary ML algorithm
- **Joblib**: Model serialization
- **CORS**: Cross-origin resource sharing support



## ⚙️ Environment Configuration

The client application uses environment variables for configuration. Create a `.env` file in the `client` directory:

```env
# API Configuration
VITE_BACKEND_URL=your_backend_url

```


## 🏁 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **Python** (3.8 or higher)
- **npm** or **yarn**
- **pip**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/piyushtyagiofficial/employee_salary_prediction.git
   cd employee_salary_prediction
   ```

2. **Set up the backend**
   ```bash
   cd server
   pip install fastapi uvicorn scikit-learn pandas numpy joblib
   ```

3. **Set up the frontend**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables**
   ```bash
   cd client
   cp .env.example .env
   # Edit .env file with your configuration
   ```
   
   Create a `.env` file in the `client` directory with:
   ```env
   VITE_BACKEND_URL=your_backend_url
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   python -m uvicorn app:app --reload --port 8000
   ```
   The API will be available at `http://localhost:8000`

2. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```
   The web application will be available at `http://localhost:5173`
   
   **Note**: Make sure your `.env` file is properly configured with the correct API URL.

## 📊 Model Information

### Input Features
The model uses the following features to make predictions:

- **Age**: Individual's age (17-80 years)
- **Work Class**: Employment type (Private, Self-employed, Government, etc.)
- **Education**: Education level 
- **Marital Status**: Current marital status
- **Occupation**: Job category
- **Relationship**: Family relationship status
- **Race**: Racial background
- **Gender**: Male or Female
- **Hours per Week**: Average working hours per week
- **Native Country**: Country of origin

### Output
- **Binary Classification**: ≤$50K or >$50K annual income
- **Confidence Score**: Model confidence in the prediction
- **Probability Distribution**: Probability for each class

## 🔧 API Endpoints

### POST `/predict`
Make salary predictions based on input features.

**Request Body:**
```json
{
  "age": 35,
  "workclass": "Private",
  "education": 9,
  "marital-status": "Married-civ-spouse",
  "occupation": "Exec-managerial",
  "relationship": "Husband",
  "race": "White",
  "gender": "Male",
  "capital-gain": "0 (fixed)",
  "capital-loss": "0 (fixed)",
  "hours-per-week": 45,
  "native-country": "United-States"
}
```

**Response:**
```json
{
  "success": true,
  "prediction": ">50K",
  "confidence": 0.85,
  "probability": {
    "<=50K": 0.15,
    ">50K": 0.85
  }
}
```

## 🎨 User Interface

The web application features:

- **Clean, Modern Design**: Built with Tailwind CSS
- **Responsive Layout**: Works on desktop and mobile devices
- **Interactive Forms**: Easy-to-use dropdown menus and input fields
- **Real-time Validation**: Form validation with helpful error messages
- **Visual Results**: Color-coded predictions with confidence indicators
- **Loading States**: Visual feedback during API calls


## 📈 Performance

- **Algorithm**: Gradient Boosting Classifier
- **Training Dataset**: Census Income Dataset
- **Features**: 12 demographic and employment features
- **Model Size**: ~2MB (serialized)
- **Prediction Time**: <100ms per prediction

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Piyush Kumar Tyagi**
- GitHub: [@piyushtyagiofficial](https://github.com/piyushtyagiofficial)

## 🙏 Acknowledgments

- UCI Machine Learning Repository for the Census Income Dataset
- FastAPI team for the excellent web framework
- React team for the powerful UI library
- Scikit-learn contributors for the machine learning tools


---

**Made with ❤️ by Piyush Tyagi**
