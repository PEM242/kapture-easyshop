import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface PublishButtonProps {
  storeUrl: string;
  isPublished: boolean;
  onPublish: () => void;
}

const PublishButton = ({ storeUrl, isPublished, onPublish }: PublishButtonProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePublish = () => {
    onPublish();
    toast({
      title: "Félicitations ! 🎉",
      description: (
        <div className="space-y-2">
          <p>Votre boutique est maintenant en ligne !</p>
          <div className="flex items-center space-x-2 p-2 bg-secondary rounded">
            <span className="flex-1 text-sm">{storeUrl}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(storeUrl);
                toast({
                  title: "Lien copié !",
                  description: "Le lien de votre boutique a été copié dans le presse-papier.",
                });
              }}
            >
              Copier
            </Button>
          </div>
        </div>
      ),
    });
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 space-y-4">
      {!isPublished ? (
        <Button
          size="lg"
          className="shadow-lg"
          onClick={handlePublish}
        >
          Publier la boutique
        </Button>
      ) : (
        <Button
          size="lg"
          className="shadow-lg"
          onClick={goToDashboard}
        >
          Aller au tableau de bord
        </Button>
      )}
    </div>
  );
};

export default PublishButton;