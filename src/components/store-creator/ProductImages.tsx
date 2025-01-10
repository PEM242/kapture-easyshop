import { useState } from "react";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Label } from "@/components/ui/label";

interface ProductImagesProps {
  mainImage: string;
  galleryImages: string[];
  onMainImageChange: (url: string) => void;
  onGalleryImageChange: (urls: string[]) => void;
}

const ProductImages = ({
  mainImage,
  galleryImages,
  onMainImageChange,
  onGalleryImageChange,
}: ProductImagesProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-semibold">Image principale *</Label>
        <p className="text-sm text-muted-foreground mb-2">
          Format recommandé : 800x800px, PNG ou JPEG
        </p>
        <ImageUpload
          value={mainImage}
          onChange={onMainImageChange}
          label="Image principale"
        />
      </div>
      
      <div>
        <Label className="text-base font-semibold">Images supplémentaires</Label>
        <p className="text-sm text-muted-foreground mb-2">
          Ajoutez jusqu'à 2 images supplémentaires
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[0, 1].map((index) => (
            <ImageUpload
              key={index}
              value={galleryImages[index] || ""}
              onChange={(url) => {
                const newGallery = [...galleryImages];
                newGallery[index] = url;
                onGalleryImageChange(newGallery.filter(Boolean));
              }}
              label={`Image ${index + 2}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImages;