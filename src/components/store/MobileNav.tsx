import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const MobileNav = () => {
  return (
    <div className="fixed top-4 right-4 z-50 md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <nav className="flex flex-col gap-4 mt-8">
            <a href="#products" className="text-lg font-medium">
              Produits
            </a>
            <a href="#address" className="text-lg font-medium">
              Adresse
            </a>
            <a href="#cart" className="text-lg font-medium">
              Panier
            </a>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;