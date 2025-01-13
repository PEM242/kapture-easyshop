import { StoreData } from "../store-creator/types";
import { Link } from "react-router-dom";
import { ShoppingBag, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface StoreHeaderProps {
  storeData: StoreData;
}

const StoreHeader = ({ storeData }: StoreHeaderProps) => {
  const { items } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Ensure the store name is properly encoded for URLs
  const encodedStoreName = encodeURIComponent(storeData.name.trim());
  
  return (
    <div className="container mx-auto px-4">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4">
                <Link to="/" className="text-lg font-semibold">
                  Accueil
                </Link>
                <Link to={`/store/${encodedStoreName}`} className="text-lg">
                  Ma boutique
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="flex items-center gap-2">
            {storeData.logo && (
              <img 
                src={storeData.logo} 
                alt={storeData.name} 
                className="h-8 w-8 rounded-full object-cover"
              />
            )}
            <span className="text-lg font-semibold">{storeData.name}</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to={`/store/${encodedStoreName}`}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Voir ma boutique
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => document.dispatchEvent(new CustomEvent('openCart'))}
          >
            <ShoppingBag className="h-6 w-6" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;