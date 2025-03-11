// src/components/DetectionResult.jsx
import React from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

const DetectionResult = ({ result }) => {
  if (!result) return null;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">
          Detection Results
        </h3>
        
        <div className="space-y-8">
          {/* Original and Detected Images */}
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Vehicle Image</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
              <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                <img 
                    src={typeof result.image === 'string' ? result.image : URL.createObjectURL(result.image)} 
                    alt="Original" 
                    className="w-full h-full object-contain"
                    onError={(e) => console.error("Image load error:", e)}
                />
              </div>
                <p className="mt-1 text-sm text-gray-500 text-center">Original Image</p>
              </div>
              <div>
              <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                <img 
                    src={typeof result.result_image === 'string' ? result.result_image : URL.createObjectURL(result.result_image)} 
                    alt="Detected" 
                    className="w-full h-full object-contain"
                    onError={(e) => console.error("Image load error:", e)}
                />
              </div>
                <p className="mt-1 text-sm text-gray-500 text-center">Detected Plate</p>
              </div>
            </div>
          </div>

          {/* Plate Text Result */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-2">Extracted Text</h4>
            <div className="flex justify-center items-center">
              <div className="text-3xl font-mono font-bold text-center py-4 px-8 bg-white border border-gray-200 rounded shadow-sm text-gray-900">
                {result.plate_text || 'No plate text detected'}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">OCR Method</p>
                <p className="font-medium text-gray-900">{result.ocr_method === 'trained' ? 'Trained Model' : 'Tesseract OCR'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Confidence</p>
                <p className="font-medium text-gray-900">{result.confidence ? `${result.confidence.toFixed(2)}%` : 'N/A'}</p>
              </div>
            </div>
          </div>
          
          {/* Detection Details */}
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Detection Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Detection ID</p>
                <p className="font-mono text-gray-900">{result.id}</p>
              </div>
              <div>
                <p className="text-gray-500">Created At</p>
                <p className="text-gray-900">{new Date(result.created_at).toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <a 
                href={result.result_image} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-500 inline-flex items-center text-sm"
              >
                View Full Image
                <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetectionResult;