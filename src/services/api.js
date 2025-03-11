// src/services/api.js
import axios from 'axios';

// Base API URL - Change this to match your backend server
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

/**
 * Upload an image and detect the license plate
 * @param {File} file - The image file
 * @param {string} ocrMethod - The OCR method to use ('trained' or 'tesseract')
 * @returns {Promise<Object>} - The detection result
 */
export const detectPlate = async (file, ocrMethod = 'trained') => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('ocr_method', ocrMethod);
  
    try {
      const response = await api.post('/plates/', formData);
      
      // If the response doesn't include the full URL for images, add the base URL
      const data = response.data;
      if (data.image && !data.image.startsWith('http')) {
        data.image = `${API_BASE_URL.replace('/api', '')}${data.image}`;
      }
      if (data.result_image && !data.result_image.startsWith('http')) {
        data.result_image = `${API_BASE_URL.replace('/api', '')}${data.result_image}`;
      }
      
      return data;
    } catch (error) {
      console.error('Error in detectPlate:', error);
      throw error;
    }
  };

/**
 * Upload multiple images and detect license plates
 * @param {File[]} files - Array of image files
 * @param {string} ocrMethod - The OCR method to use ('trained' or 'tesseract')
 * @returns {Promise<Array>} - Array of detection results
 */
export const detectPlatesBulk = async (files, ocrMethod = 'trained') => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('images', file);
  });
  formData.append('ocr_method', ocrMethod);

  try {
    const response = await api.post('/plates/detect_bulk/', formData);
    return response.data;
  } catch (error) {
    console.error('Error in detectPlatesBulk:', error);
    throw error;
  }
};

/**
 * Get all previous detections
 * @returns {Promise<Array>} - Array of detection objects
 */
export const getDetections = async () => {
  try {
    const response = await api.get('/plates/');
    return response.data;
  } catch (error) {
    console.error('Error in getDetections:', error);
    throw error;
  }
};

/**
 * Get a specific detection by ID
 * @param {string} id - Detection ID
 * @returns {Promise<Object>} - The detection object
 */
export const getDetection = async (id) => {
  try {
    const response = await api.get(`/plates/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error in getDetection:', error);
    throw error;
  }
};