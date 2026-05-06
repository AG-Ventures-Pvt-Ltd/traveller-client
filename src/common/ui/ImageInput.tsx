import React, { useState, useRef } from 'react';
import { UploadSimpleIcon } from '@phosphor-icons/react';
import MyImage from './Image';
import useS3Upload from '../hooks/useS3Upload';
import { UploadResult } from '../types';

interface ImageInputProps {
  text: string;
  onImagesChange: (images: string[] | File[]) => void;
  className?: string;
  autoUpload?: boolean;
}

const ImageInput: React.FC<ImageInputProps> = ({
  text,
  onImagesChange,
  className = '',
  autoUpload = false,
}) => {
  const [images, setImages] = useState<File[]>([]);
  const [uploadedResults, setUploadedResults] = useState<UploadResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImages, isUploading } = useS3Upload();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (autoUpload) {
      const results = await uploadImages(files);
      const urls = results.filter(r => r.success).map(r => r.url);
      setUploadedResults(results);
      onImagesChange(urls);
    } else {
      const newImages = [...images, ...files];
      setImages(newImages);
      onImagesChange(newImages);
    }
  };

  const handleRemoveImage = (index: number) => {
    if (autoUpload) {
      const newResults = uploadedResults.filter((_, i) => i !== index);
      setUploadedResults(newResults);
      const urls = newResults.filter(r => r.success).map(r => r.url);
      onImagesChange(urls);
    } else {
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
      onImagesChange(newImages);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
      <div
        onClick={handleClick}
        className={`border border-dashed border-[#D9D9D9] rounded-2xl cursor-pointer hover:border-gray-400 transition-colors min-h-[120px] flex flex-col items-center justify-center ${isUploading ? 'opacity-50' : ''}`}
      >
        {(autoUpload ? uploadedResults.length === 0 : images.length === 0) ? (
          <>
            <UploadSimpleIcon size={32} className="mb-2" weight='thin'/>
            <p className="text-[#9C9C9C] text-center text-xs">{text}</p>
            {isUploading && <p className="text-xs text-gray-500">Uploading...</p>}
          </>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {autoUpload ? (
              uploadedResults.map((result, index) => (
                <div key={index} className="relative">
                  <MyImage
                    src={result.success ? result.url : URL.createObjectURL(result.originalFile)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                    fill={false}
                    style={{ width: '100%', height: '128px' }}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(index);
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                  {!result.success && (
                    <div className="absolute bottom-1 left-1 bg-red-500 text-white text-xs px-1 rounded">
                      Failed
                    </div>
                  )}
                </div>
              ))
            ) : (
              images.map((image, index) => (
                <div key={index} className="relative">
                  <MyImage
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-20 object-cover rounded"
                    fill={false}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(index);
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
            <div
              onClick={handleClick}
              className="border-2 border-dashed border-gray-300 rounded flex items-center justify-center h-32 cursor-pointer hover:border-gray-400"
            >
              <UploadSimpleIcon size={32} className="mb-2" weight='thin'/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageInput;