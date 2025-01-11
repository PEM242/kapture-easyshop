interface StoreStats {
  totalOrders: number;
  pendingOrders: number;
  totalViews: number;
  orderHistory: Array<{
    date: string;
    orders: number;
  }>;
}

export const StatsService = {
  getStorePrefix: (storeName: string) => `store_${storeName}_`,

  getInitialStats: (): StoreStats => ({
    totalOrders: 0,
    pendingOrders: 0,
    totalViews: 0,
    orderHistory: [],
  }),

  getStoreStats: (storeName: string): StoreStats => {
    if (!storeName) return StatsService.getInitialStats();
    const prefix = StatsService.getStorePrefix(storeName);
    const savedStats = localStorage.getItem(`${prefix}stats`);
    return savedStats ? JSON.parse(savedStats) : StatsService.getInitialStats();
  },

  updateStats: (storeName: string) => {
    if (!storeName) return StatsService.getInitialStats();
    const prefix = StatsService.getStorePrefix(storeName);
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const storeOrders = orders.filter((order: any) => order.storeName === storeName);
    
    const processedOrders = storeOrders.filter((order: any) => order.status === 'traité').length;
    const pendingOrders = storeOrders.filter((order: any) => order.status === 'non traité').length;

    const currentStats = StatsService.getStoreStats(storeName);
    const today = new Date().toLocaleDateString();

    // Update order history
    let orderHistory = [...currentStats.orderHistory];
    const todayIndex = orderHistory.findIndex(entry => entry.date === today);
    
    if (todayIndex >= 0) {
      orderHistory[todayIndex].orders = processedOrders + pendingOrders;
    } else {
      orderHistory.push({ 
        date: today, 
        orders: processedOrders + pendingOrders 
      });
    }

    // Keep only last 30 days
    orderHistory = orderHistory.slice(-30);

    const newStats = {
      ...currentStats,
      totalOrders: processedOrders,
      pendingOrders: pendingOrders,
      orderHistory,
    };

    localStorage.setItem(`${prefix}stats`, JSON.stringify(newStats));
    return newStats;
  },

  incrementViews: (storeName: string) => {
    if (!storeName) return StatsService.getInitialStats();
    const prefix = StatsService.getStorePrefix(storeName);
    const currentStats = StatsService.getStoreStats(storeName);

    const newStats = {
      ...currentStats,
      totalViews: currentStats.totalViews + 1,
    };

    localStorage.setItem(`${prefix}stats`, JSON.stringify(newStats));
    return newStats;
  }
};
