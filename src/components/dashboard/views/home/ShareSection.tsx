import { Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const ShareSection = () => {
  const { toast } = useToast();
  const storeUrl = `${window.location.origin}/store`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(storeUrl);
      toast({
        title: "Lien copié !",
        description: "Le lien de votre boutique a été copié dans le presse-papier.",
      });
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le lien. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Ma boutique",
          text: "Découvrez ma boutique",
          url: storeUrl,
        });
        toast({
          title: "Partage réussi !",
          description: "Votre boutique a été partagée avec succès.",
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          toast({
            title: "Erreur",
            description: "Impossible de partager la boutique. Veuillez réessayer.",
            variant: "destructive",
          });
        }
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <Card className="bg-white rounded-3xl shadow-sm p-6">
      <CardContent className="p-0 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Publier votre boutique</h3>
            <p className="text-gray-600 mt-1">Partagez votre boutique avec vos clients</p>
            <p className="text-sm text-gray-500 mt-2">{storeUrl}</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleCopyLink}
              variant="outline"
              className="gap-2"
            >
              <Copy className="w-4 h-4" />
              Copier
            </Button>
            <Button
              onClick={handleShare}
              className="gap-2"
            >
              <Share2 className="w-4 h-4" />
              Partager
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};