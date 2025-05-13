import React, { useState, useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected: (imageUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const processFile = useCallback((file: File) => {
    if (!file.type.match('image.*')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);
      onImageSelected(result);
    };
    
    reader.readAsDataURL(file);
  }, [onImageSelected]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [processFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  }, [processFile]);

  const handleSampleImage = useCallback(() => {
    // Use a sample image from Pexels
    const sampleImageUrl = 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg';
    setPreviewUrl(sampleImageUrl);
    onImageSelected(sampleImageUrl);
  }, [onImageSelected]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div 
        className={`border-2 border-dashed rounded-lg p-8 transition-all duration-300 text-center
          ${isDragging 
            ? 'border-purple-500 bg-purple-50' 
            : previewUrl 
              ? 'border-purple-200' 
              : 'border-gray-300 hover:border-purple-300'
          }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <div className="space-y-4">
            <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-md">
              <img 
                src={previewUrl} 
                alt="Uploaded preview" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <button
              onClick={() => {
                setPreviewUrl(null);
                onImageSelected('');
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Upload Different Image
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center space-y-3">
              <Upload className="h-12 w-12 text-purple-500" />
              <h3 className="text-lg font-medium">Upload an image to begin</h3>
              <p className="text-sm text-gray-500">Drag and drop, or click to select a file</p>
            </div>
            <input
              type="file"
              id="image-upload"
              className="hidden"
              accept="image/*"
              onChange={handleFileSelect}
            />
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <label
                htmlFor="image-upload"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors cursor-pointer"
              >
                Select Image
              </label>
              <button
                onClick={handleSampleImage}
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
              >
                <ImageIcon size={16} />
                <span>Use Sample Image</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;