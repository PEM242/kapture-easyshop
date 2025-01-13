import { StoreData } from "../../store-creator/types";

interface StoreCoverProps {
  storeData: StoreData;
  themeFont: string;
}

const StoreCover = ({ storeData, themeFont }: StoreCoverProps) => {
  if (!storeData.cover) return null;

  return (
    <div className="relative h-48 md:h-64 lg:h-80 w-full overflow-hidden">
      <img
        src={storeData.cover}
        alt="Couverture"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-between p-6 md:p-8">
        <div className="flex items-center gap-4">
          {storeData.logo && (
            <img
              src={storeData.logo}
              alt="Logo"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white object-cover bg-white"
            />
          )}
          <div>
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-white ${themeFont}`}>
              {storeData.name}
            </h2>
            <p className="text-white/80 text-sm md:text-base mt-1">
              {storeData.sector} • {storeData.city}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCover;