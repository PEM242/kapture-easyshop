import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import StoreType from "./StoreType";
import StoreConfig from "./StoreConfig";
import StoreTheme from "./StoreTheme";
import ProductConfig from "./ProductConfig";
import ProgressBar from "./ProgressBar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Store } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { StoreData } from "./types";

interface StoreCreatorProps {
  storeData: StoreData;
  setStoreData: (data: StoreData) => void;
}

const initialStoreData: StoreData = {
  type: "",
  name: "",
  logo: "",
  cover: "",
  sector: "",
  address: "",
  city: "",
  contact: "",
  shipping_policy: "",
  refund_policy: "",
  country: "",
  theme: "",
  payment_methods: [],
  delivery_methods: [],
  products: []
};

const StoreCreator = ({ storeData, setStoreData }: StoreCreatorProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isStoreCreated, setIsStoreCreated] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeStore = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error("Erreur d'authentification:", userError);
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour créer une boutique.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      if (!user) {
        navigate("/auth");
        return;
      }

      // Check if user already has a store
      const { data: existingStore, error: storeError } = await supabase
        .from('stores')
        .select('*')
        .eq('owner_id', user.id)
        .single();

      if (storeError && storeError.code !== 'PGRST116') {
        console.error("Erreur lors de la vérification de la boutique:", storeError);
        return;
      }

      if (existingStore) {
        setStoreData(existingStore);
      } else {
        setStoreData(initialStoreData);
      }
    };

    initializeStore();
  }, []);

  const handleNext = async () => {
    if (validateCurrentStep()) {
      if (currentStep === 4) {
        try {
          const { data: { user }, error: userError } = await supabase.auth.getUser();
          
          if (userError || !user) {
            console.error("Erreur lors de la récupération de l'utilisateur:", userError);
            toast({
              title: "Erreur",
              description: "Impossible de créer la boutique. Veuillez vous reconnecter.",
              variant: "destructive",
            });
            return;
          }

          console.log("Tentative de création de la boutique pour l'utilisateur:", user.id);
          console.log("Données de la boutique:", storeData);

          const storeDataForDB = {
            ...storeData,
            owner_id: user.id,
          };

          delete (storeDataForDB as any).products;

          const { data: store, error: storeError } = await supabase
            .from('stores')
            .insert([storeDataForDB])
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
        if (!storeData.theme || 
            !(storeData.payment_methods || []).length || 
            !(storeData.delivery_methods || []).length) {
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
            to={`/dashboard`}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Store className="w-5 h-5" />
            Accéder au tableau de bord
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