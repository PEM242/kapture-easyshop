import { ChangeEvent, useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "./button";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

const ImageUpload = ({ value, onChange, label }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string>(value || "");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center ${
          preview ? "border-primary" : "border-gray-300"
        }`}
      >
        {preview ? (
          <div className="relative group">
            <img
              src={preview}
              alt="Preview"
              className="max-h-48 mx-auto rounded object-contain"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded">
              <Button variant="secondary" size="sm">
                Changer
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-8">
            <div className="flex flex-col items-center">
              <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-sm text-gray-600">
                Glissez une image ici ou cliquez pour sélectionner
              </p>
            </div>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id={`image-upload-${label}`}
        />
        <label
          htmlFor={`image-upload-${label}`}
          className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          Télécharger une image
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;