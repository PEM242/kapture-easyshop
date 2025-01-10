import StoreCreator from "@/components/store-creator/StoreCreator";
import { StoreData } from "@/components/store-creator/types";

interface IndexProps {
  storeData: StoreData;
  setStoreData: (data: StoreData) => void;
}

const Index = ({ storeData, setStoreData }: IndexProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="container">
        <h1 className="text-4xl font-bold text-center mb-8 animate-fade-in">
          Créez votre boutique en ligne
        </h1>
        <p className="text-gray-600 text-center mb-12 animate-fade-in">
          Suivez les étapes simples pour configurer votre boutique personnalisée
        </p>
        <StoreCreator storeData={storeData} setStoreData={setStoreData} />
      </div>
    </div>
  );
};

export default Index;
