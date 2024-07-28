import { Label } from "@/components/ui/label";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";

interface MultiImageUploaderProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  initialImageUrls?: string[]; // Optional prop for existing image URLs
}

const MultipleImageUploader: React.FC<MultiImageUploaderProps> = ({
  images,
  setImages,
  initialImageUrls = [],
}) => {
  const initialUrlsRef = useRef(initialImageUrls);
  const [previews, setPreviews] = useState<string[]>(initialUrlsRef.current);

  useEffect(() => {
    const objectUrls = images.map((file) => URL.createObjectURL(file));
    setPreviews([...initialUrlsRef.current, ...objectUrls]);

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const onSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    setImages((prevFiles) => [...prevFiles, ...files]);
  };

  const removeImage = (index: number) => {
    if (index < initialUrlsRef.current.length) {
      initialUrlsRef.current.splice(index, 1);
    } else {
      const newIndex = index - initialUrlsRef.current.length;
      const newSelectedFiles = images.filter((_, i) => i !== newIndex);
      setImages(newSelectedFiles);
    }

    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-lg mx-auto">
      <Label
        htmlFor="images"
        className="block text-sm font-medium leading-6 text-gray-700"
      >
        Images
      </Label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          {previews.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt="Selected"
                    className="mx-auto w-40 h-40 object-contain"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 p-1 text-white bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100"
                    onClick={() => removeImage(index)}
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
          )}
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor="files"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload files</span>
              <input
                id="files"
                name="files"
                type="file"
                className="sr-only"
                multiple
                onChange={onSelectFiles}
              />
            </label>
            <p className="pl-1">or drag and drop single or multiple images</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PNG, JPG, GIF up to 10MB each
          </p>
        </div>
      </div>
    </div>
  );
};

export default MultipleImageUploader;
