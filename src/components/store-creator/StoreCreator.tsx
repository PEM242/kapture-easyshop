import { useState } from "react";
import { Link } from "react-router-dom";
import StoreType from "./StoreType";
import StoreConfig from "./StoreConfig";
import StoreTheme from "./StoreTheme";
import ProductConfig from "./ProductConfig";
import ProgressBar from "./ProgressBar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Store } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export type StoreData = {
  type: string;
  name: string;
  logo: string;
  cover: string;
  sector: string;
  address: string;
  contact: string;
  shippingPolicy: string;
  refundPolicy: string;
  country: string;
  theme: string;
  paymentMethods: string[];
  deliveryMethods: string[];
  products: Product[];
};

export type Product = {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  customization: string[];
  discount: number;
  featured?: {
    collectionName: string;
  };
};

interface StoreCreatorProps {
  storeData: StoreData;
  setStoreData: (data: StoreData) => void;
}

const StoreCreator = ({ storeData, setStoreData }: StoreCreatorProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isStoreCreated, setIsStoreCreated] = useState(false);
  const { toast } = useToast();

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep === 4) {
        // Save store data to localStorage
        localStorage.setItem('storeData', JSON.stringify(storeData));
        setIsStoreCreated(true);
        toast({
          title: "Boutique créée avec succès!",
          description: "Cliquez sur le lien ci-dessous pour visualiser votre boutique.",
        });
      } else {
        setCurrentStep((prev) => Math.min(prev + 1, 4));
      }
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!storeData.type) {
          toast({
            title: "Type de boutique requis",
            description: "Veuillez sélectionner un type de boutique",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 2:
        if (!storeData.name || !storeData.sector) {
          toast({
            title: "Informations manquantes",
            description: "Veuillez remplir tous les champs obligatoires",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 3:
        if (!storeData.theme || !storeData.paymentMethods.length || !storeData.deliveryMethods.length) {
          toast({
            title: "Configuration incomplète",
            description: "Veuillez compléter la configuration de votre boutique",
            variant: "destructive",
          });
          return false;
        }
        break;
    }
    return true;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StoreType storeData={storeData} setStoreData={setStoreData} />;
      case 2:
        return <StoreConfig storeData={storeData} setStoreData={setStoreData} />;
      case 3:
        return <StoreTheme storeData={storeData} setStoreData={setStoreData} />;
      case 4:
        return <ProductConfig storeData={storeData} setStoreData={setStoreData} />;
      default:
        return null;
    }
  };

  return (
    <div className="form-container">
      <ProgressBar currentStep={currentStep} totalSteps={4} />
      <div className="mt-8 step-transition">{renderStep()}</div>
      
      {isStoreCreated ? (
        <div className="mt-8 flex flex-col items-center space-y-4">
          <p className="text-lg text-green-600 font-semibold">
            Votre boutique a été créée avec succès!
          </p>
          <Link
            to="/store"
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Store className="w-5 h-5" />
            Voir ma boutique
          </Link>
        </div>
      ) : (
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <Button
              onClick={handlePrevious}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Précédent
            </Button>
          )}
          <Button
            onClick={handleNext}
            className="flex items-center gap-2 ml-auto"
          >
            {currentStep === 4 ? "Créer ma boutique" : "Suivant"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default StoreCreator;
