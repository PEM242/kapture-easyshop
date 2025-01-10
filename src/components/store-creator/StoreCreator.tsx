import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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
  city: string;
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
  images: {
    main: string;
    gallery: string[];
  };
  category: string;
  customization: {
    sizes?: string[];
    colors?: string[];
    shoesSizes?: string[];
    customSizes?: string;
    customColors?: string;
  };
  discount: {
    type: 'percentage' | 'fixed' | null;
    value: number;
    finalPrice: number;
  };
  isActive: boolean;
  inStock: boolean;
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

  const handleNext = async () => {
    if (validateCurrentStep()) {
      if (currentStep === 4) {
        try {
          // Get the current user
          const { data: { user }, error: userError } = await supabase.auth.getUser();
          
          if (userError) {
            console.error("Erreur lors de la récupération de l'utilisateur:", userError);
            toast({
              title: "Erreur",
              description: "Impossible de créer la boutique. Veuillez vous reconnecter.",
              variant: "destructive",
            });
            return;
          }

          if (!user) {
            console.error("Aucun utilisateur connecté");
            toast({
              title: "Erreur",
              description: "Vous devez être connecté pour créer une boutique.",
              variant: "destructive",
            });
            return;
          }

          console.log("Tentative de création de la boutique pour l'utilisateur:", user.id);
          console.log("Données de la boutique:", storeData);

          // Insert the store data
          const { data: store, error: storeError } = await supabase
            .from('stores')
            .insert([
              {
                ...storeData,
                owner_id: user.id,
              }
            ])
            .select()
            .single();

          if (storeError) {
            console.error("Erreur lors de la création de la boutique:", storeError);
            toast({
              title: "Erreur",
              description: "Impossible de créer la boutique. Veuillez réessayer.",
              variant: "destructive",
            });
            return;
          }

          console.log("Boutique créée avec succès:", store);

          // Save store data to localStorage
          localStorage.setItem('storeData', JSON.stringify(storeData));
          setIsStoreCreated(true);
          toast({
            title: "Boutique créée avec succès!",
            description: "Cliquez sur le lien ci-dessous pour visualiser votre boutique.",
          });
        } catch (error) {
          console.error("Erreur inattendue:", error);
          toast({
            title: "Erreur",
            description: "Une erreur inattendue s'est produite. Veuillez réessayer.",
            variant: "destructive",
          });
        }
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