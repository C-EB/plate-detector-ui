import React from 'react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About</h1>
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Moroccan License Plate Detection</h2>
            
            <div className="prose prose-blue text-gray-500">
              <p>
                This application uses computer vision and deep learning techniques to detect and 
                recognize Moroccan vehicle license plates from images.
              </p>
              
              <h3>How It Works</h3>
              <p>
                The system uses YOLOv3-based object detection models to:
              </p>
              <ol>
                <li>Detect vehicle license plates in an uploaded image</li>
                <li>Extract and crop the license plate region</li>
                <li>Recognize characters on the plate using specialized OCR</li>
                <li>Support both Latin and Arabic characters found on Moroccan plates</li>
              </ol>
              
              <h3>OCR Methods</h3>
              <p>
                You can choose between two OCR methods:
              </p>
              <ul>
                <li>
                  <strong>Trained Model:</strong> A custom-trained YOLOv3 model specifically for Moroccan license plates, 
                  with support for Arabic characters.
                </li>
                <li>
                  <strong>Tesseract OCR:</strong> A general-purpose OCR engine that works well for Latin characters and numbers.
                </li>
              </ul>
              
              <h3>Technology Stack</h3>
              <p>
                This application is built using:
              </p>
              <ul>
                <li>React with Vite for the frontend</li>
                <li>Django REST Framework for the backend API</li>
                <li>OpenCV and YOLOv3 for computer vision processing</li>
                <li>Tesseract OCR for general OCR capabilities</li>
              </ul>
              
              <p>
                The image processing pipeline can detect license plates in various lighting conditions, 
                angles, and distances, making it suitable for a range of applications including parking 
                management, traffic monitoring, and security systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;