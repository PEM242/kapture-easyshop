import { useState } from "react";
import StoreType from "./StoreType";
import StoreConfig from "./StoreConfig";
import StoreTheme from "./StoreTheme";
import ProductConfig from "./ProductConfig";
import ProgressBar from "./ProgressBar";
import { useStoreCreation } from "./hooks/useStoreCreation";
import type { StoreData } from "./types";

interface StoreCreatorProps {
  storeData: StoreData;
  setStoreData: (data: StoreData) => void;
}

const StoreCreator = ({ storeData, setStoreData }: StoreCreatorProps) => {
  const [step, setStep] = useState(1);
  const { handleStoreCreation, isLoading } = useStoreCreation();

  const handleNext = async () => {
    if (step === 4) {
      console.log("Creating store with data:", storeData);
      await handleStoreCreation(storeData);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleStoreDataUpdate = (updates: Partial<StoreData>) => {
    console.log("Updating store data with:", updates);
    setStoreData({
      ...storeData,
      ...updates
    });
  };

  const TOTAL_STEPS = 4;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-0">
      <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />
      
      <div className="mt-8">
        {step === 1 && (
          <StoreType
            storeData={storeData}
            setStoreData={handleStoreDataUpdate}
          />
        )}
        
        {step === 2 && (
          <StoreConfig
            storeData={storeData}
            setStoreData={handleStoreDataUpdate}
          />
        )}
        
        {step === 3 && (
          <StoreTheme
            storeData={storeData}
            setStoreData={handleStoreDataUpdate}
          />
        )}
        
        {step === 4 && (
          <ProductConfig
            storeData={storeData}
            setStoreData={handleStoreDataUpdate}
          />
        )}
      </div>

      <div className="mt-8 flex justify-between pb-8">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
          >
            Retour
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={isLoading}
          className="ml-auto px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {step === 4 ? (isLoading ? "Création..." : "Créer la boutique") : "Suivant"}
        </button>
      </div>
    </div>
  );
};

export default StoreCreator;