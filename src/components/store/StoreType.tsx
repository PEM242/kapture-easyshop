import { Store, UtensilsCrossed, Palette } from "lucide-react";
import { StoreData } from "../store-creator/types";

interface StoreTypeProps {
  storeData: StoreData;
  setStoreData: (data: StoreData) => void;
}

const StoreType = ({ storeData, setStoreData }: StoreTypeProps) => {
  const storeTypes = [
    {
      id: "retail",
      title: "Commerce de Détail",
      description: "Mode, Beauté, Électronique, etc.",
      icon: Store,
      color: "bg-store-retail",
    },
    {
      id: "restaurant",
      title: "Restaurant",
      description: "Fastfood, Pizzeria, Rôtisserie, etc.",
      icon: UtensilsCrossed,
      color: "bg-store-restaurant",
    },
    {
      id: "artisan",
      title: "Artisans",
      description: "Couturiers, Bijoutiers, Fabricants sur mesure",
      icon: Palette,
      color: "bg-store-artisan",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Vous êtes ?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {storeTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setStoreData({ ...storeData, type: type.id })}
            className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
              storeData.type === type.id
                ? `border-${type.id} shadow-lg scale-105`
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full ${type.color} flex items-center justify-center mb-4 mx-auto`}
            >
              <type.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-medium mb-2">{type.title}</h3>
            <p className="text-sm text-gray-600">{type.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StoreType;
