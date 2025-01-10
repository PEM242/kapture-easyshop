import { StoreData } from "../../store-creator/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ui/ImageUpload";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SettingsViewProps {
  storeData: StoreData;
  onUpdateStore: (data: StoreData) => void;
}

const SettingsView = ({ storeData, onUpdateStore }: SettingsViewProps) => {
  const { toast } = useToast();
  
  const countries = [
    "France",
    "Belgique",
    "Suisse",
    "Canada",
    "Maroc",
    "Sénégal",
    "Côte d'Ivoire",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Modifications enregistrées",
      description: "Les informations de votre boutique ont été mises à jour.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="py-6 space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Nom de la boutique</Label>
          <Input
            id="name"
            value={storeData.name}
            onChange={(e) => onUpdateStore({ ...storeData, name: e.target.value })}
          />
        </div>

        <div>
          <Label>Logo</Label>
          <ImageUpload
            value={storeData.logo}
            onChange={(url) => onUpdateStore({ ...storeData, logo: url })}
            label="Logo"
          />
        </div>

        <div>
          <Label>Image de couverture</Label>
          <ImageUpload
            value={storeData.cover}
            onChange={(url) => onUpdateStore({ ...storeData, cover: url })}
            label="Couverture"
          />
        </div>

        <div>
          <Label htmlFor="contact">Contact</Label>
          <Input
            id="contact"
            value={storeData.contact}
            onChange={(e) =>
              onUpdateStore({ ...storeData, contact: e.target.value })
            }
          />
        </div>

        <div>
          <Label htmlFor="address">Adresse</Label>
          <Textarea
            id="address"
            value={storeData.address}
            onChange={(e) =>
              onUpdateStore({ ...storeData, address: e.target.value })
            }
          />
        </div>

        <div>
          <Label htmlFor="city">Ville</Label>
          <Input
            id="city"
            value={storeData.city || ""}
            onChange={(e) =>
              onUpdateStore({ ...storeData, city: e.target.value })
            }
          />
        </div>

        <div>
          <Label htmlFor="country">Pays</Label>
          <Select
            value={storeData.country}
            onValueChange={(value) =>
              onUpdateStore({ ...storeData, country: value })
            }
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

        <div>
          <Label htmlFor="shipping_policy">Politique de livraison</Label>
          <Textarea
            id="shipping_policy"
            value={storeData.shipping_policy}
            onChange={(e) =>
              onUpdateStore({ ...storeData, shipping_policy: e.target.value })
            }
            placeholder="Décrivez votre politique de livraison"
            className="h-32"
          />
        </div>

        <div>
          <Label htmlFor="refund_policy">Politique de retour</Label>
          <Textarea
            id="refund_policy"
            value={storeData.refund_policy}
            onChange={(e) =>
              onUpdateStore({ ...storeData, refund_policy: e.target.value })
            }
            placeholder="Décrivez votre politique de retour"
            className="h-32"
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Enregistrer les modifications
      </Button>
    </form>
  );
};

export default SettingsView;