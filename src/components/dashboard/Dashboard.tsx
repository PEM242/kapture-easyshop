import React from "react";
import { useNavigate } from "react-router-dom";
import { StoreData } from "../store-creator/types";
import DashboardHeader from "./DashboardHeader";
import DashboardNav from "./DashboardNav";
import HomeView from "./views/HomeView";
import ProductsView from "./views/ProductsView";
import OrdersView from "./views/OrdersView";
import SettingsView from "./views/SettingsView";
import { useState } from "react";

interface DashboardProps {
  storeData: StoreData;
  onUpdateStore: (data: StoreData) => void;
}

const Dashboard = ({ storeData, onUpdateStore }: DashboardProps) => {
  const [currentView, setCurrentView] = useState("home");
  const navigate = useNavigate();

  const renderView = () => {
    switch (currentView) {
      case "home":
        return <HomeView storeData={storeData} />;
      case "products":
        return <ProductsView storeData={storeData} onUpdateStore={onUpdateStore} />;
      case "orders":
        return <OrdersView storeData={storeData} />;
      case "settings":
        return <SettingsView storeData={storeData} onUpdateStore={onUpdateStore} />;
      default:
        return <HomeView storeData={storeData} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader storeData={storeData} />
      <main className="container mx-auto px-4 pb-20">
        {renderView()}
      </main>
      <DashboardNav currentView={currentView} onViewChange={setCurrentView} />
    </div>
  );
};

export default Dashboard;