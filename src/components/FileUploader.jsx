import React, { useRef, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { CloudArrowUpIcon, XCircleIcon, DocumentIcon } from '@heroicons/react/24/outline';

const FileUploader = ({ onFilesSelected, disabled }) => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    if (newFiles.length > 0) {
      setSelectedFiles(newFiles);
      onFilesSelected(newFiles);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0 && !disabled) {
      const newFiles = Array.from(e.dataTransfer.files);
      setSelectedFiles(newFiles);
      onFilesSelected(newFiles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isDragging && !disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
    onFilesSelected(newFiles);
  };

  const clearFiles = () => {
    setSelectedFiles([]);
    onFilesSelected([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-primary-500 bg-primary-50'
            : disabled
            ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
            : 'border-gray-300 hover:border-primary-500 hover:bg-primary-50'
        }`}
        onClick={() => !disabled && fileInputRef.current.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4 flex text-sm leading-6 text-gray-600">
          <label
            htmlFor="file-upload"
            className={`relative font-semibold ${
              disabled ? 'text-gray-500' : 'text-primary-600 hover:text-primary-500'
            }`}
          >
            <span>Upload files</span>
            <input
              ref={fileInputRef}
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              disabled={disabled}
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs leading-5 text-gray-600">PNG, JPG, JPEG up to 10MB</p>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700">Selected Files</h3>
            <button
              type="button"
              onClick={clearFiles}
              disabled={disabled}
              className={`text-sm font-medium ${
                disabled ? 'text-gray-400' : 'text-red-600 hover:text-red-500'
              }`}
            >
              Clear All
            </button>
          </div>
          <ul className="divide-y divide-gray-200 border rounded-md">
            {selectedFiles.map((file, index) => (
              <li key={index} className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                <div className="flex items-center flex-1 min-w-0">
                  <DocumentIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
                  <span className="ml-2 flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
                    {file.name}
                  </span>
                  <span className="ml-2 flex-shrink-0 text-gray-400">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  disabled={disabled}
                  className={`ml-4 flex-shrink-0 ${
                    disabled ? 'text-gray-300' : 'text-red-500 hover:text-red-600'
                  }`}
                >
                  <XCircleIcon className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploader;