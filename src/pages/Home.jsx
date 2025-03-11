import React, { useState, useEffect } from 'react';
import FileUploader from '../components/FileUploader';
import DetectionResult from '../components/DetectionResult';
import LoadingSpinner from '../components/LoadingSpinner';
import { detectPlate } from '../services/api';
import { useDetection } from '../context/DetectionContext';

const Home = () => {
  // Get state and functions from context
  const { 
    files, 
    ocrMethod, 
    setOcrMethod, 
    result, 
    setResult, 
    error, 
    setError, 
    currentImageIndex, 
    setCurrentImageIndex, 
    handleFilesSelected,
    clearAll
  } = useDetection();
  
  // Local loading state (doesn't need to be persisted)
  const [loading, setLoading] = useState(false);

  const handleDetect = async () => {
    if (files.length === 0) {
      setError('Please select at least one image');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      console.log("Detecting plate with OCR method:", ocrMethod);
      const response = await detectPlate(files[currentImageIndex], ocrMethod);
      
      // Ensure image URLs are absolute
      const processedResult = {
        ...response,
        image: response.image ? ensureAbsoluteUrl(response.image) : null,
        result_image: response.result_image ? ensureAbsoluteUrl(response.result_image) : null
      };
      
      console.log("Processed result:", processedResult);
      setResult(processedResult);
      
      // Scroll to results section
      setTimeout(() => {
        const resultsElement = document.getElementById('detection-results');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err) {
      console.error('Error detecting plate:', err);
      setError(err.response?.data?.error || 'An error occurred while detecting the plate');
    } finally {
      setLoading(false);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (currentImageIndex < files.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };
  
  // Helper function to ensure URLs are absolute
  const ensureAbsoluteUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http') || url.startsWith('blob:')) return url;
    return `${window.location.origin}${url}`;
  };

  // For debugging
  useEffect(() => {
    if (result) {
      console.log("Result state for rendering:", {
        hasImage: !!result.image,
        imageUrl: result.image,
        hasResultImage: !!result.result_image,
        resultImageUrl: result.result_image
      });
    }
  }, [result]);

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Moroccan License Plate Detection</h1>
        
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8 w-full">
          <div className="p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Upload Images</h2>
            <FileUploader onFilesSelected={handleFilesSelected} disabled={loading} />
            
            {files.length > 0 && (
              <div className="mt-8">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">OCR Method</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        id="trained"
                        name="ocrMethod"
                        type="radio"
                        checked={ocrMethod === 'trained'}
                        onChange={() => setOcrMethod('trained')}
                        disabled={loading}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <label htmlFor="trained" className="ml-2 block text-sm text-gray-700">
                        Trained Model
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="tesseract"
                        name="ocrMethod"
                        type="radio"
                        checked={ocrMethod === 'tesseract'}
                        onChange={() => setOcrMethod('tesseract')}
                        disabled={loading}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <label htmlFor="tesseract" className="ml-2 block text-sm text-gray-700">
                        Tesseract OCR
                      </label>
                    </div>
                  </div>
                </div>
                
                {files.length > 1 && (
                  <div className="flex items-center justify-between mb-4">
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      disabled={currentImageIndex === 0 || loading}
                      className={`inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm leading-4 font-medium rounded-md shadow-sm ${
                        currentImageIndex === 0 || loading
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-500">
                      Image {currentImageIndex + 1} of {files.length}
                    </span>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      disabled={currentImageIndex === files.length - 1 || loading}
                      className={`inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm leading-4 font-medium rounded-md shadow-sm ${
                        currentImageIndex === files.length - 1 || loading
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                )}
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Image Preview</h3>
                  <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                    <img
                      src={files[currentImageIndex] ? URL.createObjectURL(files[currentImageIndex]) : ''}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="mt-1 text-sm text-center text-gray-500">
                    {files[currentImageIndex]?.name}
                  </p>
                </div>

                <div className="mt-6 flex justify-between">
                  <button
                    type="button"
                    onClick={clearAll}
                    disabled={loading}
                    className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm ${
                      loading
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Clear All
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleDetect}
                    disabled={loading}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ${
                      loading
                        ? 'bg-primary-400 text-white cursor-not-allowed'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  >
                    {loading ? (
                      <>
                        <LoadingSpinner size="sm" color="white" />
                        <span className="ml-2">Processing...</span>
                      </>
                    ) : (
                      'Detect Plate'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-400 p-4 w-full">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div id="detection-results" className="w-full">
          {result && <DetectionResult result={result} />}
        </div>
      </div>
    </div>
  );
};

export default Home;