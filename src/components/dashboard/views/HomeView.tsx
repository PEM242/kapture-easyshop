import { StoreData } from "../../store-creator/types";
import { Card, CardContent } from "@/components/ui/card";
import { Link, RefreshCw } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

interface HomeViewProps {
  storeData: StoreData;
}

const HomeView = ({ storeData }: HomeViewProps) => {
  // Données factices pour le graphique
  const data = [
    { name: "30/09", vues: 4 },
    { name: "17/10", vues: 3 },
    { name: "02/11", vues: 6 },
    { name: "18/11", vues: 2 },
    { name: "05/12", vues: 8 },
    { name: "22/12", vues: 9 },
    { name: "08/01", vues: 5 },
    { name: "25/01", vues: 7 },
  ];

  return (
    <div className="space-y-6 py-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white rounded-3xl shadow-sm p-6">
          <CardContent className="p-0 flex items-center gap-4">
            <div className="w-12 h-12 bg-[#E8F5E9] rounded-full flex items-center justify-center">
              <Link className="w-6 h-6 text-[#4CAF50]" />
            </div>
            <div>
              <p className="text-4xl font-semibold">1</p>
              <p className="text-gray-600">Nombre de liens</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-3xl shadow-sm p-6">
          <CardContent className="p-0 flex items-center gap-4">
            <div className="w-12 h-12 bg-[#E8F5E9] rounded-full flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-[#4CAF50]" />
            </div>
            <div>
              <p className="text-4xl font-semibold">0</p>
              <p className="text-gray-600">Nombres de clics total</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white rounded-3xl shadow-sm p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Vos clics</h3>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} />
              <Bar dataKey="vues" fill="#4CAF50" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default HomeView;