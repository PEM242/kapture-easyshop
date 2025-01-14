import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { sectors, countries } from "../constants";
import { StoreData } from "../types";

interface BasicInfoSectionProps {
  storeData: StoreData;
  onUpdate: (updates: Partial<StoreData>) => void;
}

const BasicInfoSection = ({ storeData, onUpdate }: BasicInfoSectionProps) => {
  const { toast } = useToast();

  const handleCountryChange = (value: string) => {
    try {
      console.log("Changing country to:", value);
      if (!value) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner un pays valide",
          variant: "destructive",
        });
        return;
      }
      
      // Create a new object with just the updated country
      const update = { country: value };
      console.log("Updating store data with:", update);
      onUpdate(update);
      
    } catch (error) {
      console.error("Error updating country:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du pays",
        variant: "destructive",
      });
    }
  };

  const handleSectorChange = (value: string) => {
    try {
      console.log("Changing sector to:", value);
      if (!value) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner un secteur valide",
          variant: "destructive",
        });
        return;
      }
      
      // Create a new object with just the updated sector
      const update = { sector: value };
      console.log("Updating store data with:", update);
      onUpdate(update);
      
    } catch (error) {
      console.error("Error updating sector:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du secteur",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="name">Nom de la boutique</Label>
        <Input
          id="name"
          value={storeData.name}
          onChange={(e) => {
            console.log("Updating name to:", e.target.value);
            onUpdate({ name: e.target.value });
          }}
          placeholder="Ma super boutique"
        />
      </div>

      <div>
        <Label htmlFor="sector">Secteur d'activité</Label>
        <Select
          value={storeData.sector}
          onValueChange={handleSectorChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez votre secteur" />
          </SelectTrigger>
          <SelectContent>
            {sectors[storeData.type as keyof typeof sectors]?.map(
              (sector) => (
                <SelectItem key={sector} value={sector}>
                  {sector}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="country">Pays</Label>
        <Select
          value={storeData.country || ""}
          onValueChange={handleCountryChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez votre pays" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BasicInfoSection;