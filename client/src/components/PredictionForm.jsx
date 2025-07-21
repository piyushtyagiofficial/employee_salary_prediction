import React, { useState, useEffect, useRef } from "react";
import { Calculator, TrendingUp, TrendingDown, Server, Wifi } from "lucide-react";
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
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("");
  const simulationTimeoutRef = useRef([]);
  const requestStartTimeRef = useRef(0);

  // Extended loading phases to handle server startup
  const loadingPhases = [
    { message: "Connecting to server...", duration: 5000 },
    { message: "Server is starting up (this may take up to 60 seconds)...", duration: 40000 },
    { message: "Loading ML model...", duration: 15000 },
    { message: "Preparing prediction...", duration: 8000 },
    { message: "Finalizing results...", duration: 0 }
  ];

  // Progress through loading phases based on actual time elapsed
  useEffect(() => {
    if (!isLoading) return;

    simulationTimeoutRef.current.forEach(timeout => clearTimeout(timeout));
    simulationTimeoutRef.current = [];
    
    let currentTime = 0;
    const newTimeouts = [];

    loadingPhases.forEach((phase, index) => {
      const timeout = setTimeout(() => {
        if (isLoading) {
          setLoadingPhase(index);
          setLoadingMessage(phase.message);
        }
      }, currentTime);
      
      newTimeouts.push(timeout);
      currentTime += phase.duration;
    });

    simulationTimeoutRef.current = newTimeouts;

    return () => {
      simulationTimeoutRef.current.forEach(timeout => clearTimeout(timeout));
    };
  }, [isLoading]);

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

  // Progress bar calculation based on actual time elapsed
  const getProgressPercentage = () => {
    if (!isLoading && prediction) return 100;
    
    const currentTime = Date.now() - requestStartTimeRef.current;
    const totalExpectedTime = loadingPhases.reduce((sum, phase) => sum + phase.duration, 0);
    
    // Calculate progress based on actual time elapsed, capped at 90%
    const timeBasedProgress = Math.min((currentTime / totalExpectedTime) * 100, 90);
    
    // Also consider phase-based progress
    const phaseBasedProgress = Math.min((loadingPhase / (loadingPhases.length - 1)) * 90, 90);
    
    // Use the higher of the two for smoother progress
    return Math.max(timeBasedProgress, phaseBasedProgress);
  };

  const makeRequest = async (payload) => {
    return axios.post(
      import.meta.env.VITE_BACKEND_URL + "/predict",
      payload,
      {
        headers: { "Content-Type": "application/json" },
        timeout: 120000, // Increased timeout to 2 minutes
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    requestStartTimeRef.current = Date.now();
    setIsLoading(true);
    setError("");
    setPrediction(null);
    setLoadingPhase(0);
    setLoadingMessage(loadingPhases[0].message);

    try {
      // Prepare payload
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
        "capital-gain": 0,
        "capital-loss": 0
      };

      let response;
      let retryCount = 0;
      const maxRetries = 2;

      while (retryCount <= maxRetries) {
        try {
          response = await makeRequest(backendData);
          break; // Success, exit retry loop
        } catch (error) {
          retryCount++;
          
          if (retryCount > maxRetries) {
            throw error; // Final attempt failed
          }

          // If it's a connection error and we haven't exceeded retries
          if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT' || 
              error.response?.status >= 500) {
            
            // Wait for server startup on first retry
            if (retryCount === 1) {
              setLoadingMessage("Server is initializing, retrying...");
              // Wait longer for the server to start up
              await new Promise(resolve => setTimeout(resolve, 30000));
            } else {
              // Shorter wait for subsequent retries
              await new Promise(resolve => setTimeout(resolve, 10000));
            }
          } else {
            throw error; // Non-connection error, don't retry
          }
        }
      }
      
      if (response.data.success) {
        setPrediction(response.data);
      } else {
        setError(response.data.message || "Prediction failed");
      }
    } catch (error) {
      console.error("Prediction error:", error);
      
      let errorMessage = "Error connecting to server. Please try again.";
      
      if (error.code === 'ECONNREFUSED') {
        errorMessage = "Server is starting up. Please wait a moment and try again.";
      } else if (error.code === 'ETIMEDOUT' || error.message.includes('timeout')) {
        errorMessage = "Request timed out. Server may still be starting up. Please try again.";
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.response?.status >= 500) {
        errorMessage = "Server error occurred. Please try again in a moment.";
      }
      
      setError(errorMessage);
    } finally {
      // Ensure loading completes properly
      const elapsedTime = Date.now() - requestStartTimeRef.current;
      const minLoadingTime = 2000; // Minimum 2 seconds of loading
      
      if (elapsedTime < minLoadingTime) {
        await new Promise(resolve => setTimeout(resolve, minLoadingTime - elapsedTime));
      }

      // Complete the loading sequence
      setLoadingPhase(loadingPhases.length - 1);
      setLoadingMessage("Finalizing results...");
      
      // Small delay to show completion
      setTimeout(() => {
        setIsLoading(false);
        setLoadingPhase(0);
        setLoadingMessage("");
      }, 500);
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

        {/* Enhanced Interactive Loading */}
        {isLoading && (
          <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <Server className="h-8 w-8 text-blue-600" />
                <div className="absolute -top-1 -right-1">
                  <Wifi className="h-4 w-4 text-green-500 animate-pulse" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-blue-900 mb-1">
                  {loadingMessage}
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${getProgressPercentage()}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-blue-700">
                    {Math.round(getProgressPercentage())}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${loadingPhase >= 0 ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className={loadingPhase === 0 ? 'text-blue-700 font-medium' : 'text-gray-600'}>
                  Establishing connection
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${loadingPhase >= 1 ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className={loadingPhase === 1 ? 'text-blue-700 font-medium' : 'text-gray-600'}>
                  Server initialization
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${loadingPhase >= 2 ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className={loadingPhase === 2 ? 'text-blue-700 font-medium' : 'text-gray-600'}>
                  Loading ML model
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${loadingPhase >= 3 ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className={loadingPhase === 3 ? 'text-blue-700 font-medium' : 'text-gray-600'}>
                  Processing request
                </span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>First-time setup:</strong> The server may take 30-90 seconds to initialize. 
                Subsequent requests will be much faster.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
            <p className="text-red-600 text-sm mt-2">
              If the server is starting up, please wait a moment and try again.
            </p>
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
