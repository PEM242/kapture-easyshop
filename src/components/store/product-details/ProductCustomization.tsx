import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ProductCustomizationProps {
  customization: {
    sizes?: string[];
    colors?: string[];
  };
  selectedSize: string;
  selectedColor: string;
  onSizeChange: (size: string) => void;
  onColorChange: (color: string) => void;
}

const ProductCustomization = ({
  customization,
  selectedSize,
  selectedColor,
  onSizeChange,
  onColorChange,
}: ProductCustomizationProps) => {
  return (
    <div className="space-y-4">
      {customization.sizes && customization.sizes.length > 0 && (
        <div className="space-y-2">
          <Label>Taille</Label>
          <Select
            value={selectedSize}
            onValueChange={onSizeChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez une taille" />
            </SelectTrigger>
            <SelectContent>
              {customization.sizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {customization.colors && customization.colors.length > 0 && (
        <div className="space-y-2">
          <Label>Couleur</Label>
          <Select
            value={selectedColor}
            onValueChange={onColorChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez une couleur" />
            </SelectTrigger>
            <SelectContent>
              {customization.colors.map((color) => (
                <SelectItem key={color} value={color}>
                  {color}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default ProductCustomization;