import { useState, useEffect } from "react";
import { StatsService } from "@/services/StatsService";
import { StoreData } from "@/components/store-creator/types";

export const useHomeStats = (storeData: StoreData) => {
  const [stats, setStats] = useState(() => 
    StatsService.getStoreStats(storeData?.name || '')
  );

  useEffect(() => {
    if (!storeData?.name) return;

    const handleNewOrder = () => {
      const newStats = StatsService.updateStats(storeData.name);
      setStats(newStats);
    };

    const handleStoreView = () => {
      const newStats = StatsService.incrementViews(storeData.name);
      setStats(newStats);
    };

    // Initial stats update
    handleNewOrder();

    // Listen for localStorage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'orders') {
        handleNewOrder();
      }
    };

    // Listen for custom events
    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('newOrder', handleNewOrder);
    document.addEventListener('storeView', handleStoreView);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('newOrder', handleNewOrder);
      document.removeEventListener('storeView', handleStoreView);
    };
  }, [storeData?.name]);

  return stats;
};