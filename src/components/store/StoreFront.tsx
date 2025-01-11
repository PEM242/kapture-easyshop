import { StoreData } from "../store-creator/types";
import StoreHeader from "./StoreHeader";
import StoreFooter from "./StoreFooter";
import StoreCover from "./sections/StoreCover";
import FeaturedProducts from "./sections/FeaturedProducts";
import { useStoreReset } from "@/hooks/useStoreReset";
import { Button } from "../ui/button";
import { LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStoreTheme } from "@/hooks/useStoreTheme";

interface StoreFrontProps {
  storeData: StoreData;
}

const StoreFront = ({ storeData }: StoreFrontProps) => {
  const navigate = useNavigate();
  const { getThemeClasses, getThemeFont } = useStoreTheme(storeData);
  
  // Utiliser le nouveau hook pour réinitialiser les données
  useStoreReset(storeData);

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader storeData={storeData} />
      <main>
        <StoreCover 
          storeData={storeData} 
          themeFont={getThemeFont()} 
        />
        <FeaturedProducts 
          products={storeData.products}
          themeClasses={getThemeClasses('text')}
          storeType={storeData.type}
        />
      </main>
      <StoreFooter 
        storeData={storeData} 
        themeClasses={getThemeClasses('footer')} 
      />
      
      <Button
        onClick={() => navigate("/dashboard")}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 shadow-lg"
      >
        <LayoutDashboard className="mr-2 h-4 w-4" />
        Tableau de bord
      </Button>
    </div>
  );
};

export default StoreFront;