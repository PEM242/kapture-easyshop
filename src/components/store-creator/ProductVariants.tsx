import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductVariantsProps {
  customization: {
    sizes?: string[];
    colors?: string[];
    shoesSizes?: string[];
    customSizes?: string;
    customColors?: string;
  };
  onChange: (customization: any) => void;
}

const ProductVariants = ({ customization, onChange }: ProductVariantsProps) => {
  const [hasCustomSizes, setHasCustomSizes] = useState(false);
  const [hasCustomColors, setHasCustomColors] = useState(false);
  const [hasShoesSizes, setHasShoesSizes] = useState(false);

  const defaultSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const defaultColors = ["Rouge", "Bleu", "Vert", "Noir", "Blanc"];
  const defaultShoesSizes = Array.from({ length: 13 }, (_, i) => (i + 35).toString());

  return (
    <div className="space-y-6">
      <div>
        <Label>Tailles disponibles</Label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {defaultSizes.map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size}`}
                checked={customization.sizes?.includes(size)}
                onCheckedChange={(checked) => {
                  const newSizes = checked
                    ? [...(customization.sizes || []), size]
                    : customization.sizes?.filter((s) => s !== size) || [];
                  onChange({ ...customization, sizes: newSizes });
                }}
              />
              <Label htmlFor={`size-${size}`}>{size}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center space-x-2 mb-2">
          <Checkbox
            id="custom-sizes"
            checked={hasCustomSizes}
            onCheckedChange={(checked) => setHasCustomSizes(checked as boolean)}
          />
          <Label htmlFor="custom-sizes">Ajouter des tailles personnalisées</Label>
        </div>
        {hasCustomSizes && (
          <Input
            placeholder="Entrez les tailles séparées par des virgules"
            value={customization.customSizes}
            onChange={(e) =>
              onChange({ ...customization, customSizes: e.target.value })
            }
          />
        )}
      </div>

      <div>
        <div className="flex items-center space-x-2 mb-2">
          <Checkbox
            id="shoes-sizes"
            checked={hasShoesSizes}
            onCheckedChange={(checked) => setHasShoesSizes(checked as boolean)}
          />
          <Label htmlFor="shoes-sizes">Pointures de chaussures</Label>
        </div>
        {hasShoesSizes && (
          <div className="grid grid-cols-4 gap-2">
            {defaultShoesSizes.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox
                  id={`shoe-${size}`}
                  checked={customization.shoesSizes?.includes(size)}
                  onCheckedChange={(checked) => {
                    const newSizes = checked
                      ? [...(customization.shoesSizes || []), size]
                      : customization.shoesSizes?.filter((s) => s !== size) || [];
                    onChange({ ...customization, shoesSizes: newSizes });
                  }}
                />
                <Label htmlFor={`shoe-${size}`}>{size}</Label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <Label>Couleurs disponibles</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {defaultColors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color}`}
                checked={customization.colors?.includes(color)}
                onCheckedChange={(checked) => {
                  const newColors = checked
                    ? [...(customization.colors || []), color]
                    : customization.colors?.filter((c) => c !== color) || [];
                  onChange({ ...customization, colors: newColors });
                }}
              />
              <Label htmlFor={`color-${color}`}>{color}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center space-x-2 mb-2">
          <Checkbox
            id="custom-colors"
            checked={hasCustomColors}
            onCheckedChange={(checked) => setHasCustomColors(checked as boolean)}
          />
          <Label htmlFor="custom-colors">Ajouter des couleurs personnalisées</Label>
        </div>
        {hasCustomColors && (
          <Input
            placeholder="Entrez les couleurs séparées par des virgules"
            value={customization.customColors}
            onChange={(e) =>
              onChange({ ...customization, customColors: e.target.value })
            }
          />
        )}
      </div>
    </div>
  );
};

export default ProductVariants;