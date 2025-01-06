import { StoreData } from "../store-creator/StoreCreator";

interface StoreFooterProps {
  storeData: StoreData;
  themeClasses: string;
}

const StoreFooter = ({ storeData, themeClasses }: StoreFooterProps) => {
  return (
    <footer className={`py-6 bg-white border-t ${themeClasses}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-base mb-3">Contact</h3>
            <p className="text-sm mb-2">{storeData.contact}</p>
            <p className="text-sm">{storeData.address}</p>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-3">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Facebook
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Instagram
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Twitter
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-100 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} {storeData.name}. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default StoreFooter;