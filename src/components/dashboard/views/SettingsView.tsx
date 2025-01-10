import { StoreData } from "../../store-creator/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ui/ImageUpload";
import { useToast } from "@/hooks/use-toast";

interface SettingsViewProps {
  storeData: StoreData;
  onUpdateStore: (data: StoreData) => void;
}

const SettingsView = ({ storeData, onUpdateStore }: SettingsViewProps) => {
  const { toast } = useToast();

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
      </div>

      <Button type="submit" className="w-full">
        Enregistrer les modifications
      </Button>
    </form>
  );
};

export default SettingsView;