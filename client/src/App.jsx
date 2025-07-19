import React, { useState, useEffect } from 'react';
import { Brain, BarChart3, Calculator, Home, Menu, X } from 'lucide-react';
import HomePage from './components/HomePage';
import ModelTraining from './components/ModelTraining';
import PredictionForm from './components/PredictionForm';
import logo from './assets/logo.png'; 

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [modelMetrics, setModelMetrics] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleTrainingComplete = (metrics) => {
    setModelMetrics(metrics);
  };

  const handleNavigate = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false); // Close mobile menu after navigation
  };

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false); // Close mobile menu when resizing to desktop
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 w-48 h-28"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                handleNavigate('home');
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className="flex items-center justify-center">
                <img src={logo} alt="logo"/>
              </div>
              <div>
                <h1 className="text-xl font-bold text-black">Employee Salary Prediction</h1>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => handleNavigate('home')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'home'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-[#0060ad]'
                }`}
              >
                <Home className="h-4 w-4" />
                Home
              </button>
              <button
                onClick={() => handleNavigate('training')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'training'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-[#0060ad]'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                Model Training
              </button>
              <button
                onClick={() => handleNavigate('prediction')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'prediction'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-[#0060ad]'
                }`}
              >
                <Calculator className="h-4 w-4" />
                Make Prediction
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
          
          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white rounded-lg shadow-md mb-4">
              <div className="flex flex-col space-y-1 p-2">
                <button
                  onClick={() => handleNavigate('home')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-all duration-200 ${
                    activeTab === 'home'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </button>
                <button
                  onClick={() => handleNavigate('training')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-all duration-200 ${
                    activeTab === 'training'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Model Training</span>
                </button>
                <button
                  onClick={() => handleNavigate('prediction')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-all duration-200 ${
                    activeTab === 'prediction'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Calculator className="h-5 w-5" />
                  <span>Make Prediction</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {activeTab === 'home' && (
          <HomePage onNavigate={handleNavigate} />
        )}
        {activeTab === 'training' && (
          <div className="container mx-auto px-4 py-8">
            <ModelTraining onTrainingComplete={handleTrainingComplete} />
          </div>
        )}
        {activeTab === 'prediction' && (
          <div className="container mx-auto px-4 py-8">
            <PredictionForm />
          </div>
        )}
      </main>

      {/* Model Status Indicator */}
      {modelMetrics && (
        <div className="fixed bottom-6 right-6 z-40">
          <div className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
            <Brain className="h-4 w-4" />
            <span className="text-sm font-medium">Model Ready</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;