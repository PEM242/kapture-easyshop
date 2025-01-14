import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/ui/ImageUpload";
import { StoreData } from "./types";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StoreConfigProps {
  storeData: StoreData;
  setStoreData: (data: StoreData) => void;
}

const StoreConfig = ({ storeData, setStoreData }: StoreConfigProps) => {
  const { toast } = useToast();
  
  const sectors = {
    retail: [
      "Mode",
      "Beauté",
      "Électronique",
      "High Tech",
      "Épicerie",
      "Autre",
    ],
    restaurant: [
      "Fast Food",
      "Pizzeria",
      "Rôtisserie",
      "Restaurant traditionnel",
      "Autre",
    ],
    artisan: [
      "Bijouterie",
      "Couture",
      "Décoration",
      "Artisanat d'art",
      "Autre",
    ],
  };

  const countries = [
    "Bénin",
    "Burkina Faso",
    "Cameroun",
    "Côte d'Ivoire",
    "Gabon",
    "Mali",
    "République Démocratique du Congo",
    "République du Congo",
    "Sénégal"
  ].sort();

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
      const updatedData = { ...storeData, country: value };
      setStoreData(updatedData);
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
      const updatedData = { ...storeData, sector: value };
      setStoreData(updatedData);
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
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Configuration de votre boutique
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <Label htmlFor="name">Nom de la boutique</Label>
            <Input
              id="name"
              value={storeData.name}
              onChange={(e) =>
                setStoreData({ ...storeData, name: e.target.value })
              }
              placeholder="Ma super boutique"
            />
          </div>

          <div>
            <Label>Logo de la boutique</Label>
            <ImageUpload
              value={storeData.logo}
              onChange={(url) => setStoreData({ ...storeData, logo: url })}
              label="Logo de la boutique"
            />
          </div>

          <div>
            <Label>Image de couverture</Label>
            <ImageUpload
              value={storeData.cover}
              onChange={(url) => setStoreData({ ...storeData, cover: url })}
              label="Image de couverture"
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
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="address">Adresse</Label>
            <Textarea
              id="address"
              value={storeData.address}
              onChange={(e) =>
                setStoreData({ ...storeData, address: e.target.value })
              }
              placeholder="123 rue du Commerce"
              className="h-20"
            />
          </div>

          <div>
            <Label htmlFor="contact">Contact</Label>
            <Input
              id="contact"
              value={storeData.contact}
              onChange={(e) =>
                setStoreData({ ...storeData, contact: e.target.value })
              }
              placeholder="+33 6 12 34 56 78"
            />
          </div>

          <div>
            <Label htmlFor="shipping">Politique de livraison</Label>
            <Textarea
              id="shipping"
              value={storeData.shipping_policy}
              onChange={(e) =>
                setStoreData({ ...storeData, shipping_policy: e.target.value })
              }
              placeholder="Décrivez votre politique de livraison"
              className="h-20"
            />
          </div>

          <div>
            <Label htmlFor="refund">Politique de remboursement</Label>
            <Textarea
              id="refund"
              value={storeData.refund_policy}
              onChange={(e) =>
                setStoreData({ ...storeData, refund_policy: e.target.value })
              }
              placeholder="Décrivez votre politique de remboursement"
              className="h-20"
            />
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
      </div>
    </div>
  );
};

export default StoreConfig;