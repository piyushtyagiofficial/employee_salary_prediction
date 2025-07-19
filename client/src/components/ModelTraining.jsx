import React from 'react';
import { Brain, AlertCircle, Info } from 'lucide-react';

const ModelTraining = () => {
  return (
    <div id="model-training-section" className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-3 sm:mb-4">
            <Brain className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 sm:mr-3 mb-2 sm:mb-0" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Model Training</h1>
          </div>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            This application uses a Gradient Boosting Classifier that has been optimized for income prediction.
            The model is ready to make predictions without requiring additional training.
          </p>
        </div>

        {/* Model Information Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center mb-3 sm:mb-4">
            <Info className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-2 sm:mr-3" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Model Information</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
            <div className="p-2 bg-white/50 rounded">
              <strong>Algorithm:</strong> Gradient Boosting Classifier
            </div>
            <div className="p-2 bg-white/50 rounded">
              <strong>Features:</strong> 12 demographic and employment features
            </div>
            <div className="p-2 bg-white/50 rounded">
              <strong>Target:</strong> Income level (&gt;$50K or &le;$50K)
            </div>
            <div className="p-2 bg-white/50 rounded">
              <strong>Performance:</strong> 87.83% accuracy on test data
            </div>
            <div className="p-2 bg-white/50 rounded">
              <strong>Training Data:</strong> Adult Census Dataset
            </div>
            <div className="p-2 bg-white/50 rounded">
              <strong>Status:</strong> Ready for predictions
            </div>
          </div>
        </div>

        {/* Performance Metrics Card */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 sm:p-6">
          <div className="flex items-center mb-3 sm:mb-4">
            <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mr-2 sm:mr-3" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">Model Performance Metrics</h3>
          </div>
          
          {/* Metrics Grid - Adjusts columns based on screen size */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            { /* Accuracy */}
                  <div className="bg-white rounded-lg p-3 sm:p-4 text-center shadow-sm">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">87%</div>
                    <div className="text-sm sm:text-base text-gray-600">Accuracy</div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mt-2">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: '87.83%' }}></div>
                    </div>
                  </div>

                  {/* Precision */}
                  <div className="bg-white rounded-lg p-3 sm:p-4 text-center shadow-sm">
                    <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">87%</div>
                    <div className="text-sm sm:text-base text-gray-600">Precision</div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mt-2">
                    <div className="bg-green-600 h-full rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>

                  {/* Recall */}
                  <div className="bg-white rounded-lg p-3 sm:p-4 text-center shadow-sm">
                    <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">88%</div>
                    <div className="text-sm sm:text-base text-gray-600">Recall</div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mt-2">
                    <div className="bg-purple-600 h-full rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>

                  {/* F1-Score */}
                  <div className="bg-white rounded-lg p-3 sm:p-4 text-center shadow-sm">
                    <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">87%</div>
                    <div className="text-sm sm:text-base text-gray-600">F1-Score</div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mt-2">
                    <div className="bg-orange-600 h-full rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                  </div>

                  {/* Metric Explanations */}
<div className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-600 space-y-2">
  <p><strong>Accuracy:</strong> Overall correctness of the model — how often predictions match actual outcomes.</p>
  <p><strong>Precision:</strong> Of the people predicted to earn &gt;$50K, how many actually do?</p>
  <p><strong>Recall:</strong> Of all people who actually earn &gt;$50K, how many did the model correctly identify?</p>
  <p><strong>F1-Score:</strong> Harmonic mean of precision and recall — balances both false positives and false negatives.</p>
</div>

        </div>

        {/* Alert Box */}
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 mr-2 sm:mr-3 mt-0.5" />
            <div>
              <p className="text-yellow-800 font-medium text-base sm:text-lg">Ready to Make Predictions</p>
              <p className="text-yellow-700 text-sm sm:text-base mt-1">
                The model is pre-trained and ready to use. Navigate to the "Make Prediction" tab to start predicting income levels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelTraining;