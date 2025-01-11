import { useEffect } from 'react';
import { StoreData } from '@/components/store-creator/types';

export const useStoreReset = (storeData: StoreData) => {
  useEffect(() => {
    if (storeData.name) {
      // Réinitialiser les données du localStorage
      localStorage.removeItem('orders');
      localStorage.removeItem('storeStats');
      
      // Déclencher l'événement de vue de la boutique
      document.dispatchEvent(new CustomEvent('storeView'));
    }
  }, [storeData.name]);
};