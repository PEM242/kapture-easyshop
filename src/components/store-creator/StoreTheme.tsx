import { StoreData } from "./StoreCreator";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface StoreThemeProps {
  storeData: StoreData;
  setStoreData: (data: StoreData) => void;
}

interface Theme {
  id: string;
  name: string;
  bgColor: string;
  textColor: string;
}

const StoreTheme = ({ storeData, setStoreData }: StoreThemeProps) => {
  const themes: Theme[] = [
    { id: "theme1", name: "Thème 1", bgColor: "bg-black", textColor: "text-white" },
    { id: "theme2", name: "Thème 2", bgColor: "bg-blue-600", textColor: "text-white" },
    { id: "theme3", name: "Thème 3", bgColor: "bg-green-500", textColor: "text-white" },
  ];

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
        <div className="space-y-4">
          <Label>Thème</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setStoreData({ ...storeData, theme: theme.id })}
                className={cn(
                  "w-full aspect-square rounded-lg border-2 transition-all duration-300",
                  theme.bgColor,
                  theme.textColor,
                  storeData.theme === theme.id
                    ? "border-primary shadow-lg scale-105"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <div className="flex items-center justify-center h-full text-center">
                  {theme.name}
                </div>
              </button>
            ))}
          </div>
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