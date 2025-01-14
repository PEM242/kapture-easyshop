import { StoreData } from "./types";
import BasicInfoSection from "./store-config/BasicInfoSection";
import ImageSection from "./store-config/ImageSection";
import PolicySection from "./store-config/PolicySection";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StoreConfigProps {
  storeData: StoreData;
  setStoreData: (data: StoreData) => void;
}

const StoreConfig = ({ storeData, setStoreData }: StoreConfigProps) => {
  const handleUpdate = (updates: Partial<StoreData>) => {
    setStoreData({ ...storeData, ...updates });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Configuration de votre boutique
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <BasicInfoSection 
            storeData={storeData} 
            onUpdate={handleUpdate} 
          />
          <ImageSection 
            storeData={storeData} 
            onUpdate={handleUpdate} 
          />
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="address">Adresse</Label>
            <Textarea
              id="address"
              value={storeData.address}
              onChange={(e) => handleUpdate({ address: e.target.value })}
              placeholder="123 rue du Commerce"
              className="h-20"
            />
          </div>

          <div>
            <Label htmlFor="contact">Contact</Label>
            <Input
              id="contact"
              value={storeData.contact}
              onChange={(e) => handleUpdate({ contact: e.target.value })}
              placeholder="+33 6 12 34 56 78"
            />
          </div>

          <PolicySection 
            storeData={storeData} 
            onUpdate={handleUpdate} 
          />
        </div>
      </div>
    </div>
  );
};

export default StoreConfig;