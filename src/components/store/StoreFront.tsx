import { useParams } from "react-router-dom";
import { StoreData } from "../store-creator/StoreCreator";
import { cn } from "@/lib/utils";
import { Facebook, Instagram, Twitter, Youtube, Linkedin, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

interface StoreFrontProps {
  storeData: StoreData;
}

const StoreFront = ({ storeData }: StoreFrontProps) => {
  const { storeId } = useParams();

  const getThemeClasses = (element: 'header' | 'footer' | 'button') => {
    const storeType = storeData.type === 'retail' || storeData.type === 'artisan' ? 'retail' : 'restaurant';
    const themeNumber = storeData.theme.replace('theme', '');
    
    const theme = {
      retail: {
        theme1: {
          header: 'bg-black text-white',
          footer: 'bg-black text-gray-400',
          button: 'bg-gray-400 text-black hover:bg-gray-600',
        },
        theme2: {
          header: 'bg-blue-600 text-white',
          footer: 'bg-blue-200 text-blue-600',
          button: 'bg-blue-200 text-blue-600 hover:bg-blue-800 hover:text-white',
        },
        theme3: {
          header: 'bg-green-500 text-white',
          footer: 'bg-green-200 text-green-500',
          button: 'bg-green-200 text-green-500 hover:bg-green-700 hover:text-white',
        },
      },
      restaurant: {
        theme1: {
          header: 'bg-black text-white',
          footer: 'bg-gray-400 text-black',
          button: 'bg-black text-white hover:bg-gray-700',
        },
        theme2: {
          header: 'bg-red-600 text-white',
          footer: 'bg-orange-200 text-red-600',
          button: 'bg-orange-200 text-red-600 hover:bg-red-800 hover:text-white',
        },
        theme3: {
          header: 'bg-olive text-white',
          footer: 'bg-beige text-olive',
          button: 'bg-beige text-olive hover:bg-olive-dark hover:text-white',
        },
      },
    };

    return theme[storeType][`theme${themeNumber}`][element];
  };

  const getNavigationLinks = () => {
    switch (storeData.type) {
      case 'retail':
      case 'artisan':
        return ['Produits', 'Contact'];
      case 'restaurant':
        return ['Menu', 'Contact'];
      default:
        return ['Services', 'Contact'];
    }
  };

  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
    linkedin: Linkedin,
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className={cn("w-full py-4 transition-colors duration-300 sticky top-0 z-50", getThemeClasses('header'))}>
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
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        {/* Banner */}
        {storeData.cover && (
          <div className="relative h-[400px] w-full overflow-hidden">
            <img
              src={storeData.cover}
              alt="Couverture"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h2 className="text-4xl font-bold text-white text-center px-4">
                Bienvenue chez {storeData.name}
              </h2>
            </div>
          </div>
        )}

        {/* Featured Products Section */}
        <section className="container mx-auto py-16 px-4">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            {storeData.type === "restaurant" ? "Notre Menu" : "Nos Produits en Vedette"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {storeData.products.slice(0, 6).map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">{product.price} €</span>
                    <button
                      className={cn(
                        "px-4 py-2 rounded-md transition-colors duration-300",
                        getThemeClasses('button')
                      )}
                    >
                      {storeData.type === "restaurant" ? "Commander" : "Voir détails"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={cn("py-12", getThemeClasses('footer'))}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <p className="mb-2">{storeData.contact}</p>
              <p>{storeData.address}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Politiques</h3>
              <ul className="space-y-2">
                <li>Conditions Générales de Vente</li>
                {storeData.refundPolicy && (
                  <li>Politique de remboursement</li>
                )}
                {storeData.shippingPolicy && (
                  <li>Politique de livraison</li>
                )}
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                {Object.entries(socialIcons).map(([platform, Icon]) => (
                  <a
                    key={platform}
                    href="#"
                    className="hover:opacity-80 transition-opacity"
                    aria-label={`Suivez-nous sur ${platform}`}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-current/10 text-center">
            <p>&copy; {new Date().getFullYear()} {storeData.name}. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StoreFront;