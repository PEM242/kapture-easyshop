import { useState, useEffect } from "react";
import { StatsService } from "@/services/StatsService";
import { StoreData } from "@/components/store-creator/types";

export const useHomeStats = (storeData: StoreData) => {
  const [stats, setStats] = useState(StatsService.getStoreStats(storeData.name));

  useEffect(() => {
    const handleNewOrder = () => {
      const newStats = StatsService.updateStats(storeData.name);
      setStats(newStats);
    };

    const handleStoreView = () => {
      const newStats = StatsService.incrementViews(storeData.name);
      setStats(newStats);
    };

    // Écouter les changements dans le localStorage
    window.addEventListener('storage', (e) => {
      if (e.key === 'orders') {
        handleNewOrder();
      }
    });

    // Écouter les événements personnalisés
    document.addEventListener('newOrder', handleNewOrder);
    document.addEventListener('storeView', handleStoreView);

    // Mettre à jour les statistiques au chargement
    handleNewOrder();

    return () => {
      window.removeEventListener('storage', handleNewOrder);
      document.removeEventListener('newOrder', handleNewOrder);
      document.removeEventListener('storeView', handleStoreView);
    };
  }, [storeData.name]);

  return stats;
};