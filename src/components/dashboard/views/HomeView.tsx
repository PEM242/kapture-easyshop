import { StoreData } from "../../store-creator/types";
import { Card, CardContent } from "@/components/ui/card";
import { Link, RefreshCw, DollarSign, ShoppingBag } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useEffect, useState } from "react";

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
  deliveryStats: Array<{
    type: string;
    value: number;
  }>;
}

const HomeView = ({ storeData }: HomeViewProps) => {
  const [stats, setStats] = useState<StoreStats>({
    totalOrders: 0,
    pendingOrders: 0,
    totalViews: 0,
    orderHistory: [],
    deliveryStats: [
      { type: "Livraison à domicile", value: 0 },
      { type: "Récupération sur place", value: 0 },
    ],
  });

  useEffect(() => {
    // Initialize stats from localStorage or create new
    const savedStats = localStorage.getItem('storeStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }

    // Listen for new orders
    const handleNewOrder = (event: CustomEvent) => {
      setStats(prevStats => {
        const newStats = {
          ...prevStats,
          totalOrders: prevStats.totalOrders + 1,
          pendingOrders: prevStats.pendingOrders + 1,
          orderHistory: [
            ...prevStats.orderHistory,
            { date: new Date().toLocaleDateString(), orders: prevStats.totalOrders + 1 }
          ],
          deliveryStats: prevStats.deliveryStats.map(stat => ({
            ...stat,
            value: stat.type === event.detail.deliveryType ? stat.value + 1 : stat.value
          }))
        };
        localStorage.setItem('storeStats', JSON.stringify(newStats));
        return newStats;
      });
    };

    // Listen for order status updates
    const handleOrderStatusUpdate = (event: CustomEvent) => {
      setStats(prevStats => {
        const newStats = {
          ...prevStats,
          pendingOrders: prevStats.pendingOrders - 1,
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
    document.addEventListener('newOrder', handleNewOrder as EventListener);
    document.addEventListener('orderStatusUpdate', handleOrderStatusUpdate as EventListener);
    document.addEventListener('storeView', handleStoreView);

    // Cleanup
    return () => {
      document.removeEventListener('newOrder', handleNewOrder as EventListener);
      document.removeEventListener('orderStatusUpdate', handleOrderStatusUpdate as EventListener);
      document.removeEventListener('storeView', handleStoreView);
    };
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="space-y-6 py-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-white rounded-3xl shadow-sm p-6">
          <CardContent className="p-0 flex items-center gap-4">
            <div className="w-12 h-12 bg-[#E8F5E9] rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-[#4CAF50]" />
            </div>
            <div>
              <p className="text-4xl font-semibold">{stats.totalOrders}</p>
              <p className="text-gray-600">Commandes totales</p>
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
              <p className="text-gray-600">Commandes en cours</p>
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

      <div className="grid gap-6 md:grid-cols-2">
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

        <Card className="bg-white rounded-3xl shadow-sm p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Répartition des commandes</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.deliveryStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.deliveryStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomeView;