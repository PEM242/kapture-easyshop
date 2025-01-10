import { Home, Package, ShoppingBag, Settings } from "lucide-react";

interface DashboardNavProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const DashboardNav = ({ currentView, onViewChange }: DashboardNavProps) => {
  const navItems = [
    { id: "home", label: "Accueil", icon: Home },
    { id: "products", label: "Produits", icon: ShoppingBag },
    { id: "orders", label: "Commandes", icon: Package },
    { id: "settings", label: "Paramètres", icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                currentView === item.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;