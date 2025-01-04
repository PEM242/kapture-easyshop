import { Facebook, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";
import { StoreData } from "../store-creator/StoreCreator";

interface StoreFooterProps {
  storeData: StoreData;
  themeClasses: string;
}

const StoreFooter = ({ storeData, themeClasses }: StoreFooterProps) => {
  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
    linkedin: Linkedin,
  };

  return (
    <footer className={`py-12 ${themeClasses}`}>
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
              {storeData.refundPolicy && <li>Politique de remboursement</li>}
              {storeData.shippingPolicy && <li>Politique de livraison</li>}
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
  );
};

export default StoreFooter;