import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

interface OrdersChartProps {
  orderHistory: Array<{
    date: string;
    orders: number;
  }>;
}

export const OrdersChart = ({ orderHistory }: OrdersChartProps) => {
  return (
    <Card className="bg-white rounded-3xl shadow-sm p-6">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Évolution des commandes</h3>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={orderHistory} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#666" fontSize={12} />
            <YAxis stroke="#666" fontSize={12} />
            <Bar dataKey="orders" fill="#4CAF50" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};