import { StoreData } from "../../store-creator/types";

interface StoreCoverProps {
  storeData: StoreData;
  themeFont: string;
}

const StoreCover = ({ storeData, themeFont }: StoreCoverProps) => {
  if (!storeData.cover) return null;

  return (
    <div className="relative h-24 md:h-48 w-full overflow-hidden">
      <img
        src={storeData.cover}
        alt="Couverture"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h2 className={`text-xl md:text-3xl font-bold text-white text-center px-4 ${themeFont}`}>
          {storeData.name}
        </h2>
      </div>
    </div>
  );
};

export default StoreCover;