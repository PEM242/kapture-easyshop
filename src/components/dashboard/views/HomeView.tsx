import { StatsCards } from "./home/StatsCards";
import { OrdersChart } from "./home/OrdersChart";
import { ShareSection } from "./home/ShareSection";
import { useHomeStats } from "./home/useHomeStats";
import { StoreData } from "@/components/store-creator/types";

interface HomeViewProps {
  storeData: StoreData;
}

const HomeView = ({ storeData }: HomeViewProps) => {
  const stats = useHomeStats(storeData);

  if (!storeData?.name) {
    return <div className="p-4">Chargement des statistiques...</div>;
  }

  return (
    <div className="space-y-8 p-4">
      <StatsCards 
        totalOrders={stats.totalOrders}
        pendingOrders={stats.pendingOrders}
        totalViews={stats.views}
      />
      <OrdersChart orderHistory={stats.orderHistory} />
      <ShareSection storeData={storeData} />
    </div>
  );
};

export default HomeView;