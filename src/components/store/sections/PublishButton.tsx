import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface PublishButtonProps {
  isPublished: boolean;
  onPublish: () => void;
  storeName: string;
}

const PublishButton = ({ isPublished, onPublish, storeName }: PublishButtonProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePublish = () => {
    onPublish();
    const storeUrl = `${window.location.origin}/store/${storeName.toLowerCase().replace(/\s+/g, '-')}`;
    
    toast({
      title: "Boutique publiée !",
      description: "Votre boutique est maintenant en ligne. Copiez le lien pour la partager !",
    });

    // Navigate to dashboard after publishing
    navigate("/dashboard");
  };

  return (
    <Button
      onClick={handlePublish}
      className="w-full md:w-auto"
      disabled={isPublished}
    >
      {isPublished ? "Déjà publié" : "Publier la boutique"}
    </Button>
  );
};

export default PublishButton;