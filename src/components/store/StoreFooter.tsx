import { StoreData } from "../store-creator/types";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

interface StoreFooterProps {
  storeData: StoreData;
  themeClasses: string;
}

const StoreFooter = ({ storeData, themeClasses }: StoreFooterProps) => {
  return (
    <footer className={`py-8 bg-white border-t ${themeClasses}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <p className="text-sm">{storeData.address}, {storeData.city}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <p className="text-sm">{storeData.contact}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <p className="text-sm">contact@{storeData.name.toLowerCase()}.com</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Informations</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Politique de livraison</li>
              <li>Politique de remboursement</li>
              <li>Conditions générales</li>
              <li>Politique de confidentialité</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} {storeData.name}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default StoreFooter;