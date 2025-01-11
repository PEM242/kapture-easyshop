import { StoreData } from "../store-creator/types";
import { Link } from "react-router-dom";

interface StoreHeaderProps {
  storeData: StoreData;
}

const StoreHeader = ({ storeData }: StoreHeaderProps) => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold">{storeData.name}</h1>
        <p className="text-gray-600">{storeData.sector}</p>
        <Link 
          to={`/store/${encodeURIComponent(storeData.name)}`} 
          className="text-blue-500 hover:underline"
        >
          Voir la boutique
        </Link>
      </div>
    </header>
  );
};

export default StoreHeader;