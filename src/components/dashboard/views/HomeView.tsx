import { StoreData } from "../../store-creator/types";
import { ShareSection } from "./home/ShareSection";
import { StatsCards } from "./home/StatsCards";
import { OrdersChart } from "./home/OrdersChart";
import { useHomeStats } from "./home/useHomeStats";

interface HomeViewProps {
  storeData: StoreData;
}

const HomeView = ({ storeData }: HomeViewProps) => {
  const stats = useHomeStats();

  return (
    <div className="space-y-6 py-6">
      <ShareSection />
      <StatsCards
        totalOrders={stats.totalOrders}
        pendingOrders={stats.pendingOrders}
        totalViews={stats.totalViews}
      />
      <OrdersChart orderHistory={stats.orderHistory} />
    </div>
  );
};

export default HomeView;