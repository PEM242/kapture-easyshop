import { StoreData } from "../../store-creator/types";
import { Card, CardContent } from "@/components/ui/card";
import { Link, RefreshCw, DollarSign, ShoppingBag, Share2, Copy } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface HomeViewProps {
  storeData: StoreData;
}

interface StoreStats {
  totalOrders: number;
  pendingOrders: number;
  totalViews: number;
  orderHistory: Array<{
    date: string;
    orders: number;
  }>;
}

const HomeView = ({ storeData }: HomeViewProps) => {
  const { toast } = useToast();
  const [stats, setStats] = useState<StoreStats>({
    totalOrders: 0,
    pendingOrders: 0,
    totalViews: 0,
    orderHistory: [],
  });

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
          title: storeData.name,
          text: `Découvrez ma boutique ${storeData.name}`,
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

  useEffect(() => {
    // Initialize stats from localStorage or create new
    const savedStats = localStorage.getItem('storeStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }

    // Listen for new orders
    const handleNewOrder = () => {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const processedOrders = orders.filter((order: any) => order.status === 'traité').length;
      const pendingOrders = orders.filter((order: any) => order.status === 'non traité').length;
      
      setStats(prevStats => {
        const newStats = {
          ...prevStats,
          totalOrders: processedOrders,
          pendingOrders: pendingOrders,
          orderHistory: [
            ...prevStats.orderHistory,
            { date: new Date().toLocaleDateString(), orders: processedOrders }
          ],
        };
        localStorage.setItem('storeStats', JSON.stringify(newStats));
        return newStats;
      });
    };

    // Listen for store views
    const handleStoreView = () => {
      setStats(prevStats => {
        const newStats = {
          ...prevStats,
          totalViews: prevStats.totalViews + 1,
        };
        localStorage.setItem('storeStats', JSON.stringify(newStats));
        return newStats;
      });
    };

    // Add event listeners
    window.addEventListener('storage', (e) => {
      if (e.key === 'orders') {
        handleNewOrder();
      }
    });
    document.addEventListener('storeView', handleStoreView);

    // Initial load of orders
    handleNewOrder();

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleNewOrder);
      document.removeEventListener('storeView', handleStoreView);
    };
  }, []);

  return (
    <div className="space-y-6 py-6">
      {/* Publish Store Card */}
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

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-white rounded-3xl shadow-sm p-6">
          <CardContent className="p-0 flex items-center gap-4">
            <div className="w-12 h-12 bg-[#E8F5E9] rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-[#4CAF50]" />
            </div>
            <div>
              <p className="text-4xl font-semibold">{stats.totalOrders}</p>
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
              <p className="text-4xl font-semibold">{stats.pendingOrders}</p>
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
              <p className="text-4xl font-semibold">{stats.totalViews}</p>
              <p className="text-gray-600">Vues totales de la boutique</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        <Card className="bg-white rounded-3xl shadow-sm p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Évolution des commandes</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.orderHistory} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Bar dataKey="orders" fill="#4CAF50" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomeView;