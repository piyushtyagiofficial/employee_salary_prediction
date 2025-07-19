import React, { useState } from "react";
import { Calculator, TrendingUp, TrendingDown } from "lucide-react";
import axios from "axios";

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    age: "50",
    workclass: "Private",
    education_num: "Bachelors",
    marital_status: "Never-married",
    occupation: "Tech-support",
    relationship: "Not-in-family",
    race: "White",
    gender: "Male",
    hours_per_week: "50",
    native_country: "India",
  });

  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const workclassOptions = [
    "Private",
    "Self-emp-not-inc",
    "Self-emp-inc",
    "Federal-gov",
    "Local-gov",
    "State-gov",
    "Others",
  ];
  const educationOptions = [
    "9th",
    "10th",
    "11th",
    "12th",
    "HS-grad",
    "Some-college",
    "Assoc-voc",
    "Assoc-acdm",
    "Bachelors",
    "Masters",
    "Prof-school",
    "Doctorate",
  ];
  const maritalStatusOptions = [
    "Married-civ-spouse",
    "Divorced",
    "Never-married",
    "Separated",
    "Widowed",
    "Married-spouse-absent",
  ];
  const occupationOptions = [
    "Tech-support",
    "Craft-repair",
    "Other-service",
    "Sales",
    "Exec-managerial",
    "Prof-specialty",
    "Handlers-cleaners",
    "Machine-op-inspct",
    "Adm-clerical",
    "Farming-fishing",
    "Transport-moving",
    "Priv-house-serv",
    "Protective-serv",
    "Armed-Forces",
    "Others",
  ];
  const relationshipOptions = [
    "Wife",
    "Own-child",
    "Husband",
    "Not-in-family",
    "Other-relative",
    "Unmarried",
  ];
  const raceOptions = [
    "White",
    "Asian-Pac-Islander",
    "Amer-Indian-Eskimo",
    "Other",
    "Black",
  ];
  const genderOptions = ["Female", "Male"];
  const countryOptions = [
    "United-States",
    "Cambodia",
    "England",
    "Puerto-Rico",
    "Canada",
    "Germany",
    "India",
    "Japan",
    "China",
    "Cuba",
    "Mexico",
    "Philippines",
    "Italy",
    "Poland",
    "Other",
  ];

  // Education mapping to numbers
  const educationMapping = {
    "9th": 5,
    "10th": 6,
    "11th": 7,
    "12th": 8,
    "HS-grad": 9,
    "Some-college": 10,
    "Assoc-voc": 11,
    "Assoc-acdm": 12,
    Bachelors: 13,
    Masters: 14,
    "Prof-school": 15,
    Doctorate: 16,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");
  setPrediction(null);

  try {
    // Map to backend's expected field names and types
    const backendData = {
      age: parseInt(formData.age, 10) || 0,
      workclass: formData.workclass,
      educational_num: educationMapping[formData.education_num] || 0,
      marital_status: formData.marital_status,
      occupation: formData.occupation,
      relationship: formData.relationship,
      race: formData.race,
      gender: formData.gender,
      hours_per_week: parseInt(formData.hours_per_week, 10) || 0,
      native_country: formData.native_country,
      // Default values for required backend fields
      "capital-gain": 0,
      "capital-loss": 0
    };

    const response = await axios.post(
      import.meta.env.VITE_BACKEND_URL + "/predict", // Use environment variable for backend URL
      backendData,  // Axios automatically stringifies to JSON
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    if (response.data.success) {
      setPrediction(response.data);
    } else {
      setError(response.data.message || "Prediction failed");
    }
  } catch (error) {
    setError(
      error.response?.data?.detail || 
      "Error connecting to server. Please make sure the model is trained."
    );
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Income Prediction
          </h2>
          <p className="text-gray-600">
            Enter demographic information to predict income level
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
                min="17"
                max="80"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Class
              </label>
              <select
                name="workclass"
                value={formData.workclass}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Work Class</option>
                {workclassOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Education
              </label>
              <select
                name="education_num"
                value={formData.education_num}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Education</option>
                {educationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Marital Status
              </label>
              <select
                name="marital_status"
                value={formData.marital_status}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Marital Status</option>
                {maritalStatusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Occupation
              </label>
              <select
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Occupation</option>
                {occupationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relationship
              </label>
              <select
                name="relationship"
                value={formData.relationship}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Relationship</option>
                {relationshipOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Race
              </label>
              <select
                name="race"
                value={formData.race}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Race</option>
                {raceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Gender</option>
                {genderOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hours per Week
              </label>
              <input
                type="number"
                name="hours_per_week"
                value={formData.hours_per_week}
                onChange={handleInputChange}
                required
                min="1"
                max="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Native Country
              </label>
              <select
                name="native_country"
                value={formData.native_country}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Country</option>
                {countryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`flex items-center gap-3 px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  Predicting...
                </>
              ) : (
                <>
                  <Calculator className="h-5 w-5" />
                  Predict Income
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {prediction && (
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Prediction Result
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  {prediction.prediction === ">50K" ? (
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  ) : (
                    <TrendingDown className="h-6 w-6 text-red-500" />
                  )}
                  <h4 className="font-semibold text-lg">Prediction</h4>
                </div>
                <p
                  className={`text-2xl font-bold ${
                    prediction.prediction === ">50K"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {prediction.prediction === ">50K"
                    ? "More than $50K"
                    : "$50K or less"}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Confidence: {(prediction.confidence * 100).toFixed(1)}%
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-lg mb-3">
                  Probability Distribution
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">&le; $50K</span>
                    <span className="font-semibold text-red-600">
                      {(prediction.probabilities["<=50K"] * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">&gt; $50K</span>
                    <span className="font-semibold text-green-600">
                      {(prediction.probabilities[">50K"] * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionForm;
