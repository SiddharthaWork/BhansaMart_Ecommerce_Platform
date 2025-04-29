import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

interface FileWithPreview extends File {
  preview?: string;
  progress?: number;
}

interface UploadPhotosProps {
  value?: (File | string)[];
  onChange?: (files: (File | string)[]) => void;
}

export const UploadPhotos: React.FC<UploadPhotosProps> = ({
  value = [],
  onChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewFiles, setPreviewFiles] = useState<FileWithPreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ALLOWED_TYPES = [
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'video/mp4',
  ];
  const MAX_SIZE = 50 * 1024 * 1024; // 50MB

  useEffect(() => {
    return () => {
      previewFiles.forEach((file) => {
        if (file instanceof File && file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [previewFiles]);

  useEffect(() => {
    const newPreviewFiles = value.map((item) => {
      if (item instanceof File) {
        return {
          ...item,
          preview: URL.createObjectURL(item),
          progress: 100,
        };
      } else {
        return {
          preview: `https://api-bhansa.webstudiomatrix.com${item}`,
          progress: 100,
        } as FileWithPreview;
      }
    });
    setPreviewFiles(newPreviewFiles);
  }, [value]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert('File type not supported');
      return false;
    }
    if (file.size > MAX_SIZE) {
      alert('File size exceeds 50MB limit');
      return false;
    }
    return true;
  };

  const handleFiles = (fileList: FileList) => {
    const validFiles = Array.from(fileList).filter(validateFile);

    const newPreviewFiles = validFiles.map((file) => ({
      ...file,
      preview: URL.createObjectURL(file),
      progress: 100,
    }));

    const updatedValue = [...(value || []), ...validFiles];
    setPreviewFiles((prev) => [...prev, ...newPreviewFiles]);
    onChange?.(updatedValue);
  };

  const removeFile = (indexToRemove: number) => {
    const fileToRemove = previewFiles[indexToRemove];
    if (fileToRemove instanceof File && fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }

    setPreviewFiles((prev) => prev.filter((_, i) => i !== indexToRemove));

    const updatedValue = value.filter((_, i) => i !== indexToRemove);
    onChange?.(updatedValue);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files);
  };

  return (
    <div className="p-4 max-w-md">
      {previewFiles.length === 0 ? (
        // Main Upload Box (Shown only when no images are selected)
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-lg p-8
            flex flex-col items-center justify-center
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          `}
        >
          <Icon
            icon="qlementine-icons:cloud-up-16"
            className="h-12 w-12 text-gray-400 mb-4"
          />
          <p className="text-sm text-gray-500 text-center mb-4">
            JPEG, PNG, SVG, and MP4 formats, up to 50MB
          </p>
          <button
            type="button"
            onClick={handleBrowseClick}
            className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Browse File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.svg,.mp4"
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
      ) : (
        // Minimal Upload Button (Shown when at least one image is uploaded)
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleBrowseClick}
            className="p-2 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center space-x-2"
          >
            <Icon
              icon="material-symbols:add-photo-alternate"
              className="h-5 w-5 text-gray-600"
            />
            <span className="text-gray-600 text-sm">Add More</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.svg,.mp4"
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
      )}

      {previewFiles.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {previewFiles.map((file, index) => (
            <div key={index} className="relative">
              <div
                className="aspect-square rounded-lg overflow-hidden"
                style={{ backgroundColor: 'transparent' }}
              >
                <div className="relative h-full">
                  <img
                    src={file.preview || '/placeholder.svg'}
                    alt={`Preview ${index + 1}`}
                    className="h-full w-full object-contain"
                    style={{
                      backgroundColor: 'transparent',
                      mixBlendMode: 'normal',
                    }}
                  />
                  {typeof file.progress === 'number' && file.progress < 100 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="text-white font-semibold">
                        {file.progress}%
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <Icon icon="charm:cross" className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
