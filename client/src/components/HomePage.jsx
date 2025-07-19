import React from "react";
import {
  Brain,
  BarChart3,
  Calculator,
  TrendingUp,
  Users,
  Database,
  Zap,
  Shield,
  Award,
  CheckCircle,
  Code,
  Server,
  Cpu,
} from "lucide-react";

const HomePage = ({ onNavigate }) => {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-blue-600" />,
      title: "ML Model",
      description:
        "Gradient Boosting Classifier with 87.83% accuracy, ready to use without training time",
    },
    {
      icon: <Database className="w-8 h-8 text-green-600" />,
      title: "Complete Data Pipeline",
      description:
        "Automated preprocessing with categorical encoding, scaling, and validation",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
      title: "Comprehensive Analytics",
      description:
        "Detailed performance metrics with accuracy, precision, recall, and F1-score",
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: "Real-time Predictions",
      description:
        "Instant income classification with confidence scores and probability distribution",
    },
    {
      icon: <Server className="w-8 h-8 text-red-600" />,
      title: "FastAPI Backend",
      description:
        "Modern, fast API with automatic documentation and async support",
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: "Professional Interface",
      description:
        "Responsive React frontend with modern design and intuitive user experience",
    },
  ];

  const stats = [
    {
      label: "Model Accuracy",
      value: "87%",
      icon: <Award className="w-5 h-5" />,
    },
    {
      label: "Features Used",
      value: "12",
      icon: <Database className="w-5 h-5" />,
    },
    {
      label: "Training Samples",
      value: "38K+",
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: "Processing Speed",
      value: "<50ms",
      icon: <Zap className="w-5 h-5" />,
    },
  ];

  const techStack = [
    {
      category: "Backend",
      icon: <Server className="w-6 h-6 text-blue-600" />,
      technologies: [
        "FastAPI",
        "Python 3.8+",
        "Scikit-learn",
        "Pandas",
        "NumPy",
        "Pydantic",
      ],
    },
    {
      category: "Frontend",
      icon: <Code className="w-6 h-6 text-green-600" />,
      technologies: [
        "React 18",
        "JavaScript ES6+",
        "Tailwind CSS",
        "Axios",
        "Lucide Icons",
      ],
    },
    {
      category: "Machine Learning",
      icon: <Cpu className="w-6 h-6 text-purple-600" />,
      technologies: [
        "Gradient Boosting",
        "Label Encoding",
        "Standard Scaling",
      ],
    },
  ];

  const steps = [
    {
      number: "01",
      title: "View Model Info",
      description:
        "Check the model performance and specifications",
      icon: <Brain className="w-6 h-6" />,
    },
    {
      number: "02",
      title: "Input Demographics",
      description:
        "Fill in the comprehensive form with age, education, occupation, and other details",
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: "03",
      title: "Get Prediction",
      description:
        "Receive instant income classification with confidence scores",
      icon: <Calculator className="w-6 h-6" />,
    },
    {
      number: "04",
      title: "Analyze Results",
      description:
        "Review probability distribution and confidence metrics for insights",
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <div className="flex justify-center items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                <Brain className="w-28 h-28 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Salary Prediction
              <span className="block text-purple-600">
                Machine Learning
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Advanced machine learning application that predicts whether a
              person earns more than $50K annually using demographic and
              employment data. Built with FastAPI backend and React frontend.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate("training")}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                View Model Info
              </button>
              <button
                onClick={() => onNavigate("prediction")}
                className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-all duration-200 shadow-lg"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Make Prediction
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg text-center"
            >
              <div className="flex justify-center mb-3">
                <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg text-blue-600">
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built with cutting-edge technology and best practices for
            production-ready machine learning applications
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="text-xl font-semibold text-gray-900 ml-3">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Technology Stack
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Modern, scalable architecture using industry-leading technologies
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {techStack.map((stack, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  {stack.icon}
                  <h3 className="text-xl font-semibold text-gray-900 ml-3">
                    {stack.category}
                  </h3>
                </div>
                <div className="space-y-2">
                  {stack.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-gray-700">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple 4-step process to get accurate income predictions using our
            pre-trained model
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {step.number}
                </div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dataset Information */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Dataset Features
              </h2>
              <p className="text-lg text-gray-600">
                Our pre-trained model uses 12 key demographic and employment
                features from the Adult Census Dataset
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Age (17-75 years)",
                "Work Class (Private, Government, Self-employed)",
                "Education Level",
                "Marital Status",
                "Occupation Category",
                "Family Relationship",
                "Race",
                "Gender",
                "Capital Gains ($)",
                "Capital Losses ($)",
                "Hours per Week (1-99)",
                "Native Country",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-center">
                <strong>Target Variable:</strong> Income level classification
                (&le;$50K or &gt;$50K annually)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Predicting Income Levels?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            This model is ready to use. Get instant predictions with
            confidence scores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                onNavigate("training");
                // Scroll to top after navigation
                setTimeout(() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }, 100);
              }}
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <Brain className="w-5 h-5 mr-2" />
              View Model Details
            </button>
            <button
              onClick={() => {
                onNavigate("prediction");
                // Scroll to top after navigation
                setTimeout(() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }, 100);
              }}
              className="inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Try Prediction Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
