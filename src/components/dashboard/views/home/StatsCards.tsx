import { DollarSign, RefreshCw, ShoppingBag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardsProps {
  totalOrders: number;
  pendingOrders: number;
  totalViews: number;
}

export const StatsCards = ({ totalOrders, pendingOrders, totalViews }: StatsCardsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="bg-white rounded-3xl shadow-sm p-6">
        <CardContent className="p-0 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#E8F5E9] rounded-full flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-[#4CAF50]" />
          </div>
          <div>
            <p className="text-4xl font-semibold">{totalOrders}</p>
            <p className="text-gray-600">Commandes traitées</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-3xl shadow-sm p-6">
        <CardContent className="p-0 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#E8F5E9] rounded-full flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-[#4CAF50]" />
          </div>
          <div>
            <p className="text-4xl font-semibold">{pendingOrders}</p>
            <p className="text-gray-600">Commandes non traitées</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-3xl shadow-sm p-6">
        <CardContent className="p-0 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#E8F5E9] rounded-full flex items-center justify-center">
            <RefreshCw className="w-6 h-6 text-[#4CAF50]" />
          </div>
          <div>
            <p className="text-4xl font-semibold">{totalViews}</p>
            <p className="text-gray-600">Vues totales de la boutique</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};