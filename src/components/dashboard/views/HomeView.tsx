import { StoreData } from "../../store-creator/types";
import { Card, CardContent } from "@/components/ui/card";
import { Link, RefreshCw, DollarSign, ShoppingBag } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface HomeViewProps {
  storeData: StoreData;
}

const HomeView = ({ storeData }: HomeViewProps) => {
  // Données factices pour les graphiques
  const salesData = [
    { name: "30/09", ventes: 400 },
    { name: "17/10", ventes: 300 },
    { name: "02/11", ventes: 600 },
    { name: "18/11", ventes: 200 },
    { name: "05/12", ventes: 800 },
    { name: "22/12", ventes: 900 },
    { name: "08/01", ventes: 500 },
    { name: "25/01", ventes: 700 },
  ];

  const pieData = [
    { name: "Produits", value: 400 },
    { name: "Services", value: 300 },
    { name: "Autres", value: 300 },
  ];

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
              <p className="text-4xl font-semibold">45</p>
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
              <p className="text-4xl font-semibold">12</p>
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
              <p className="text-4xl font-semibold">156</p>
              <p className="text-gray-600">Vues totales de la boutique</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white rounded-3xl shadow-sm p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Évolution des ventes</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Bar dataKey="ventes" fill="#4CAF50" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-white rounded-3xl shadow-sm p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Répartition des ventes</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
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