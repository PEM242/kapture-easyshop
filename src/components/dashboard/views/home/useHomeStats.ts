import { useState, useEffect } from 'react';
import { StatsService } from '@/services/StatsService';
import { StoreData } from '@/components/store-creator/types';

export const useHomeStats = (storeData: StoreData) => {
  const [stats, setStats] = useState(() => 
    StatsService.getStoreStats(storeData?.name || '')
  );

  useEffect(() => {
    if (!storeData?.name) return;

    // Initial stats update
    const newStats = StatsService.updateStats(storeData.name);
    setStats(newStats);

    const handleNewOrder = () => {
      const updatedStats = StatsService.updateStats(storeData.name);
      setStats(updatedStats);
    };

    const handleStoreView = () => {
      const updatedStats = StatsService.incrementViews(storeData.name);
      setStats(updatedStats);
    };

    document.addEventListener('newOrder', handleNewOrder);
    document.addEventListener('storeView', handleStoreView);

    return () => {
      document.removeEventListener('newOrder', handleNewOrder);
      document.removeEventListener('storeView', handleStoreView);
    };
  }, [storeData?.name]);

  return stats;
};