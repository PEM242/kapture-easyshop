import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { StoreData } from "../store-creator/types";
import { useCart } from "@/contexts/CartContext";

interface StoreHeaderProps {
  storeData: StoreData;
  themeClasses: string;
  onCartClick: () => void;
}

const StoreHeader = ({ storeData, themeClasses, onCartClick }: StoreHeaderProps) => {
  const { items } = useCart();
  
  const getNavigationLinks = () => {
    switch (storeData.type) {
      case "retail":
      case "artisan":
        return ["Produits", "Contact"];
      case "restaurant":
        return ["Menu", "Contact"];
      default:
        return ["Services", "Contact"];
    }
  };

  return (
    <header className={`w-full py-4 transition-colors duration-300 sticky top-0 z-50 ${themeClasses}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {storeData.logo && (
              <img src={storeData.logo} alt="Logo" className="h-12 w-auto object-contain" />
            )}
            <h1 className="text-2xl font-bold">{storeData.name || "Ma Boutique"}</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {getNavigationLinks().map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="hover:opacity-80 transition-opacity"
              >
                {link}
              </a>
            ))}
            <Button 
              variant="outline" 
              size="icon" 
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default StoreHeader;