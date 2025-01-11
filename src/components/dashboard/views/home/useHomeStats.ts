import { useState, useEffect } from "react";
import { StatsService } from "@/services/StatsService";

export const useHomeStats = () => {
  const [stats, setStats] = useState(StatsService.getInitialStats());

  useEffect(() => {
    const handleNewOrder = () => {
      const newStats = StatsService.updateStats();
      setStats(newStats);
    };

    const handleStoreView = () => {
      const newStats = StatsService.incrementViews();
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
  }, []);

  return stats;
};