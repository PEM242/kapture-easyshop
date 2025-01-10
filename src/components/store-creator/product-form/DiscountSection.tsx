import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { ProductFormState } from "../types";

interface DiscountSectionProps {
  discount: ProductFormState["discount"];
  price: number;
  onDiscountChange: (discount: ProductFormState["discount"]) => void;
}

const DiscountSection = ({ discount, price, onDiscountChange }: DiscountSectionProps) => {
  const calculateFinalPrice = (price: number, discount: ProductFormState["discount"]) => {
    if (!discount.type || !discount.value) return price;
    if (discount.type === "percentage") {
      return price * (1 - discount.value / 100);
    }
    return Math.max(0, price - discount.value);
  };

  return (
    <div>
      <Label>Réduction</Label>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <select
            className="w-full p-2 border rounded"
            value={discount.type || ""}
            onChange={(e) =>
              onDiscountChange({
                ...discount,
                type: e.target.value as "percentage" | "fixed" | null,
                finalPrice: calculateFinalPrice(price, {
                  ...discount,
                  type: e.target.value as "percentage" | "fixed" | null,
                }),
              })
            }
          >
            <option value="">Pas de réduction</option>
            <option value="percentage">Pourcentage (%)</option>
            <option value="fixed">Montant fixe</option>
          </select>
        </div>
        {discount.type && (
          <Input
            type="number"
            value={discount.value}
            onChange={(e) =>
              onDiscountChange({
                ...discount,
                value: parseFloat(e.target.value),
                finalPrice: calculateFinalPrice(price, {
                  ...discount,
                  value: parseFloat(e.target.value),
                }),
              })
            }
            placeholder={
              discount.type === "percentage"
                ? "Pourcentage"
                : "Montant"
            }
          />
        )}
      </div>
      {discount.type && (
        <p className="text-sm text-muted-foreground mt-2">
          Prix final : {discount.finalPrice.toFixed(2)} €
        </p>
      )}
    </div>
  );
};

export default DiscountSection;