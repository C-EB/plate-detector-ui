import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const DetectionContext = createContext();

// Create a provider component
export const DetectionProvider = ({ children }) => {
  // State variables that were previously in Home.jsx
  const [files, setFiles] = useState([]);
  const [ocrMethod, setOcrMethod] = useState('trained');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Load state from localStorage on initial load
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('detectionState');
      if (savedState) {
        const { ocrMethod: savedOcrMethod, result: savedResult, error: savedError } = JSON.parse(savedState);
        
        setOcrMethod(savedOcrMethod || 'trained');
        setError(savedError || null);
        
        // Only restore result if it exists
        if (savedResult) {
          setResult(savedResult);
        }
      }
    } catch (err) {
      console.error('Error loading saved detection state:', err);
    }
  }, []);
  
  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      // Only save these values as they can be safely serialized
      const stateToSave = {
        ocrMethod,
        result,
        error
      };
      
      localStorage.setItem('detectionState', JSON.stringify(stateToSave));
    } catch (err) {
      console.error('Error saving detection state:', err);
    }
  }, [ocrMethod, result, error]);
  
  // Create a function to handle file uploads (can't save File objects to localStorage)
  const handleFilesSelected = (selectedFiles) => {
    setFiles(selectedFiles);
    setCurrentImageIndex(0);
    
    // Don't clear result here if you want to preserve it
    // Only clear error
    setError(null);
  };
  
  // Function to clear all state
  const clearAll = () => {
    setFiles([]);
    setResult(null);
    setError(null);
    setCurrentImageIndex(0);
    localStorage.removeItem('detectionState');
  };
  
  const value = {
    files,
    setFiles,
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
  };
  
  return (
    <DetectionContext.Provider value={value}>
      {children}
    </DetectionContext.Provider>
  );
};

// Create a custom hook for using this context
export const useDetection = () => {
  const context = useContext(DetectionContext);
  if (context === undefined) {
    throw new Error('useDetection must be used within a DetectionProvider');
  }
  return context;
};