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
  getInitialStats: (): StoreStats => ({
    totalOrders: 0,
    pendingOrders: 0,
    totalViews: 0,
    orderHistory: [],
  }),

  updateStats: () => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const processedOrders = orders.filter((order: any) => order.status === 'traité').length;
    const pendingOrders = orders.filter((order: any) => order.status === 'non traité').length;

    const savedStats = localStorage.getItem('storeStats');
    const currentStats = savedStats ? JSON.parse(savedStats) : StatsService.getInitialStats();

    const newStats = {
      ...currentStats,
      totalOrders: processedOrders,
      pendingOrders: pendingOrders,
      orderHistory: [
        ...currentStats.orderHistory,
        { 
          date: new Date().toLocaleDateString(), 
          orders: processedOrders + pendingOrders 
        }
      ],
    };

    localStorage.setItem('storeStats', JSON.stringify(newStats));
    return newStats;
  },

  incrementViews: () => {
    const savedStats = localStorage.getItem('storeStats');
    const currentStats = savedStats ? JSON.parse(savedStats) : StatsService.getInitialStats();

    const newStats = {
      ...currentStats,
      totalViews: currentStats.totalViews + 1,
    };

    localStorage.setItem('storeStats', JSON.stringify(newStats));
    return newStats;
  }
};