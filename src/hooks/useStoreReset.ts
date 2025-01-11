import { useEffect } from "react";
import { StoreData } from "@/components/store-creator/types";

export const useStoreReset = (storeData: StoreData) => {
  useEffect(() => {
    // Préfixe unique pour la boutique
    const storePrefix = `store_${storeData.name}_`;
    
    // Réinitialiser les données spécifiques à la boutique
    const resetStoreData = () => {
      // Garder uniquement les commandes de cette boutique
      const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const storeOrders = allOrders.filter((order: any) => order.storeName === storeData.name);
      localStorage.setItem('orders', JSON.stringify(storeOrders));

      // Réinitialiser les statistiques de la boutique
      const initialStats = {
        totalOrders: 0,
        pendingOrders: 0,
        totalViews: 0,
        orderHistory: [],
      };
      localStorage.setItem(`${storePrefix}stats`, JSON.stringify(initialStats));
    };

    resetStoreData();
  }, [storeData.name]);
};