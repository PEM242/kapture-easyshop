import { StoreData } from "@/components/store-creator/types";
import { Card } from "@/components/ui/card";
import { Share2 } from "lucide-react";

interface ShareSectionProps {
  storeData: StoreData;
}

export const ShareSection = ({ storeData }: ShareSectionProps) => {
  const storeUrl = `${window.location.origin}/store/${storeData.name}`;

  return (
    <Card className="bg-white rounded-3xl shadow-sm p-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[#E8F5E9] rounded-full flex items-center justify-center">
          <Share2 className="w-6 h-6 text-[#4CAF50]" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">Partager votre boutique</h3>
          <p className="text-gray-600 break-all">{storeUrl}</p>
        </div>
      </div>
    </Card>
  );
};