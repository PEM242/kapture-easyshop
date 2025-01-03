import { StoreData } from "./StoreCreator";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface StoreThemeProps {
  storeData: StoreData;
  setStoreData: (data: StoreData) => void;
}

const StoreTheme = ({ storeData, setStoreData }: StoreThemeProps) => {
  const themes = {
    retail: ["Modern", "Élégant", "Minimaliste", "Coloré"],
    restaurant: ["Chaleureux", "Traditionnel", "Moderne", "Rustique"],
    artisan: ["Artisanal", "Créatif", "Élégant", "Vintage"],
  };

  const paymentMethods = [
    { id: "store", label: "Paiement en boutique" },
    { id: "delivery", label: "Paiement à la livraison" },
  ];

  const deliveryMethods = [
    { id: "pickup", label: "Récupérer sur place" },
    { id: "delivery", label: "Livraison à domicile" },
  ];

  const handlePaymentMethodChange = (methodId: string, checked: boolean) => {
    if (checked) {
      setStoreData({
        ...storeData,
        paymentMethods: [...storeData.paymentMethods, methodId],
      });
    } else {
      setStoreData({
        ...storeData,
        paymentMethods: storeData.paymentMethods.filter((id) => id !== methodId),
      });
    }
  };

  const handleDeliveryMethodChange = (methodId: string, checked: boolean) => {
    if (checked) {
      setStoreData({
        ...storeData,
        deliveryMethods: [...storeData.deliveryMethods, methodId],
      });
    } else {
      setStoreData({
        ...storeData,
        deliveryMethods: storeData.deliveryMethods.filter((id) => id !== methodId),
      });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Personnalisation de votre boutique
      </h2>

      <div className="space-y-8">
        <div>
          <Label htmlFor="theme">Thème</Label>
          <Select
            value={storeData.theme}
            onValueChange={(value) =>
              setStoreData({ ...storeData, theme: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un thème" />
            </SelectTrigger>
            <SelectContent>
              {themes[storeData.type as keyof typeof themes]?.map((theme) => (
                <SelectItem key={theme} value={theme}>
                  {theme}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Moyens de paiement</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`payment-${method.id}`}
                  checked={storeData.paymentMethods.includes(method.id)}
                  onCheckedChange={(checked) =>
                    handlePaymentMethodChange(method.id, checked as boolean)
                  }
                />
                <label
                  htmlFor={`payment-${method.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {method.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label>Moyens de livraison</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deliveryMethods.map((method) => (
              <div key={method.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`delivery-${method.id}`}
                  checked={storeData.deliveryMethods.includes(method.id)}
                  onCheckedChange={(checked) =>
                    handleDeliveryMethodChange(method.id, checked as boolean)
                  }
                />
                <label
                  htmlFor={`delivery-${method.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {method.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreTheme;