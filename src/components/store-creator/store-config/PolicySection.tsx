import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StoreData } from "../types";

interface PolicySectionProps {
  storeData: StoreData;
  onUpdate: (updates: Partial<StoreData>) => void;
}

const PolicySection = ({ storeData, onUpdate }: PolicySectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="shipping">Politique de livraison</Label>
        <Textarea
          id="shipping"
          value={storeData.shipping_policy}
          onChange={(e) => onUpdate({ shipping_policy: e.target.value })}
          placeholder="Décrivez votre politique de livraison"
          className="h-20"
        />
      </div>

      <div>
        <Label htmlFor="refund">Politique de remboursement</Label>
        <Textarea
          id="refund"
          value={storeData.refund_policy}
          onChange={(e) => onUpdate({ refund_policy: e.target.value })}
          placeholder="Décrivez votre politique de remboursement"
          className="h-20"
        />
      </div>
    </div>
  );
};

export default PolicySection;