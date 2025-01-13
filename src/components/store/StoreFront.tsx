import { StoreData } from "../store-creator/types";
import StoreCover from "./sections/StoreCover";
import StoreHeader from "./StoreHeader";
import StoreFooter from "./StoreFooter";
import FeaturedProducts from "./sections/FeaturedProducts";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, MapPin, Phone, Truck, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStoreTheme } from "@/hooks/useStoreTheme";
import ProductGrid from "./product-grid/ProductGrid";
import { useState, useEffect } from "react";
import CartModal from "./cart/CartModal";
import { useStoreReset } from "@/hooks/useStoreReset";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface StoreFrontProps {
  storeData: StoreData;
  showDashboardButton?: boolean;
}

const StoreFront = ({ storeData, showDashboardButton = true }: StoreFrontProps) => {
  const navigate = useNavigate();
  const { getThemeClasses, getThemeFont } = useStoreTheme(storeData);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  useStoreReset(storeData);

  useEffect(() => {
    const handleOpenCart = () => setIsCartOpen(true);
    document.addEventListener('openCart', handleOpenCart);
    document.dispatchEvent(new CustomEvent('storeView'));
    return () => {
      document.removeEventListener('openCart', handleOpenCart);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader storeData={storeData} />
      <main className="pb-20">
        <StoreCover storeData={storeData} themeFont={getThemeFont()} />
        
        {/* Store Information Section */}
        <section className="container mx-auto px-4 py-8">
          <Card className="p-6 shadow-lg rounded-xl bg-white/80 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h2 className={`text-2xl font-semibold ${getThemeFont()}`}>
                  À propos de {storeData.name}
                </h2>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <p>{storeData.address}, {storeData.city}, {storeData.country}</p>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-5 h-5" />
                  <p>{storeData.contact}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className={`text-xl font-semibold ${getThemeFont()}`}>
                  Services
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">Livraison</span>
                    </div>
                    <ul className="list-disc list-inside text-sm text-gray-600 ml-7">
                      {storeData.delivery_methods.map((method, index) => (
                        <li key={index}>{method}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">Paiement</span>
                    </div>
                    <ul className="list-disc list-inside text-sm text-gray-600 ml-7">
                      {storeData.payment_methods.map((method, index) => (
                        <li key={index}>{method}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className={`text-xl font-semibold ${getThemeFont()}`}>
                  Politique de livraison
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {storeData.shipping_policy}
                </p>
              </div>
              <div className="space-y-4">
                <h3 className={`text-xl font-semibold ${getThemeFont()}`}>
                  Politique de remboursement
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {storeData.refund_policy}
                </p>
              </div>
            </div>
          </Card>
        </section>

        <FeaturedProducts 
          products={storeData.products || []}
          themeClasses={getThemeClasses('text')}
          storeType={storeData.type}
        />

        <div className="container mx-auto px-4 py-8">
          <ProductGrid 
            storeData={storeData}
            buttonThemeClass={getThemeClasses('button')}
          />
        </div>
      </main>

      <StoreFooter 
        storeData={storeData}
        themeClasses={getThemeClasses('text')}
      />

      {showDashboardButton && (
        <Button
          onClick={() => navigate('/dashboard')}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 shadow-lg"
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Tableau de bord
        </Button>
      )}

      <CartModal 
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        storeData={storeData}
      />
    </div>
  );
};

export default StoreFront;