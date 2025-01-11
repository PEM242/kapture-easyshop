export const StatsService = {
  getInitialStats: () => ({
    totalOrders: 0,
    pendingOrders: 0,
    views: 0,
    orderHistory: []
  }),

  getStorePrefix: (storeName: string) => `store_${storeName}_`,

  getStoreStats: (storeName: string) => {
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

    const newStats = {
      ...StatsService.getInitialStats(),
      totalOrders: processedOrders,
      pendingOrders: pendingOrders,
      orderHistory: [{
        date: new Date().toLocaleDateString(),
        orders: processedOrders + pendingOrders
      }]
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
      views: (currentStats.views || 0) + 1
    };

    localStorage.setItem(`${prefix}stats`, JSON.stringify(newStats));
    return newStats;
  }
};