import { useState, useEffect } from "react";
import { StatsService } from "@/services/StatsService";
import { StoreData } from "@/components/store-creator/types";

export const useHomeStats = (storeData: StoreData) => {
  const [stats, setStats] = useState(() => 
    StatsService.getStoreStats(storeData.name)
  );

  useEffect(() => {
    const handleNewOrder = () => {
      const newStats = StatsService.updateStats(storeData.name);
      setStats(newStats);
    };

    const handleStoreView = () => {
      const newStats = StatsService.incrementViews(storeData.name);
      setStats(newStats);
    };

    // Listen for localStorage changes
    window.addEventListener('storage', (e) => {
      if (e.key === 'orders') {
        handleNewOrder();
      }
    });

    // Listen for custom events
    document.addEventListener('newOrder', handleNewOrder);
    document.addEventListener('storeView', handleStoreView);

    // Update stats on load
    handleNewOrder();

    return () => {
      window.removeEventListener('storage', handleNewOrder);
      document.removeEventListener('newOrder', handleNewOrder);
      document.removeEventListener('storeView', handleStoreView);
    };
  }, [storeData.name]);

  return stats;
};