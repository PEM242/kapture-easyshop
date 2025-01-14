import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/ui/ImageUpload";
import { StoreData } from "../types";

interface ImageSectionProps {
  storeData: StoreData;
  onUpdate: (updates: Partial<StoreData>) => void;
}

const ImageSection = ({ storeData, onUpdate }: ImageSectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label>Logo de la boutique</Label>
        <ImageUpload
          value={storeData.logo}
          onChange={(url) => onUpdate({ logo: url })}
          label="Logo de la boutique"
        />
      </div>

      <div>
        <Label>Image de couverture</Label>
        <ImageUpload
          value={storeData.cover}
          onChange={(url) => onUpdate({ cover: url })}
          label="Image de couverture"
        />
      </div>
    </div>
  );
};

export default ImageSection;