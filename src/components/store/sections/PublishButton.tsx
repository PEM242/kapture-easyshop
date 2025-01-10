import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import { StoreData } from "../../store-creator/types";

interface PublishButtonProps {
  isPublished: boolean;
  onPublish: () => void;
  storeName: StoreData['name'];
}

const PublishButton = ({ isPublished, onPublish, storeName }: PublishButtonProps) => {
  const { toast } = useToast();

  const handlePublish = () => {
    const storeLink = `${window.location.origin}/store/${storeName.toLowerCase().replace(/\s+/g, '-')}`;
    
    onPublish();
    
    toast({
      title: "🎉 Félicitations !",
      description: (
        <div className="mt-2 space-y-4">
          <p>Votre boutique est maintenant publiée et accessible en ligne.</p>
          <div className="flex items-center gap-2 p-2 bg-gray-100 rounded">
            <span className="text-sm truncate flex-1">{storeLink}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(storeLink);
                toast({
                  title: "Lien copié !",
                  description: "Le lien de votre boutique a été copié dans le presse-papier.",
                });
              }}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            className="w-full"
            onClick={() => window.location.href = "/dashboard"}
          >
            Aller au tableau de bord
          </Button>
        </div>
      ),
    });
  };

  if (isPublished) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg">
      <Button
        onClick={handlePublish}
        className="w-full max-w-md mx-auto block"
        size="lg"
      >
        Publier la boutique
      </Button>
    </div>
  );
};

export default PublishButton;