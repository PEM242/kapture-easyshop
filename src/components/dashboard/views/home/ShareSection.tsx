import { StoreData } from "@/components/store-creator/types";
import { Card } from "@/components/ui/card";
import { Share2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ShareSectionProps {
  storeData: StoreData;
}

export const ShareSection = ({ storeData }: ShareSectionProps) => {
  const { toast } = useToast();
  const baseUrl = window.location.origin;
  const storeUrl = `${baseUrl}/store/${storeData.name}`;
  const publicUrl = `${baseUrl}/s/${storeData.name}`;

  const copyToClipboard = (url: string, type: string) => {
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Lien copié !",
        description: `Le lien ${type} a été copié dans le presse-papier.`,
      });
    });
  };

  return (
    <Card className="bg-white rounded-3xl shadow-sm p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#E8F5E9] rounded-full flex items-center justify-center">
            <Share2 className="w-6 h-6 text-[#4CAF50]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">Partager votre boutique</h3>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-700">Lien privé (avec tableau de bord)</p>
              <p className="text-xs text-gray-500 break-all">{storeUrl}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(storeUrl, "privé")}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-700">Lien public (sans tableau de bord)</p>
              <p className="text-xs text-gray-500 break-all">{publicUrl}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(publicUrl, "public")}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};