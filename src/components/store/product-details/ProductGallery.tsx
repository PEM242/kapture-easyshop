import { ScrollArea } from "@/components/ui/scroll-area";

interface ProductGalleryProps {
  images: {
    main: string;
    gallery: string[];
  };
  name: string;
}

const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  return (
    <div className="space-y-4">
      <div className="aspect-square relative overflow-hidden rounded-lg">
        {images.main ? (
          <img
            src={images.main}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-sm text-gray-400">No image</span>
          </div>
        )}
      </div>

      {images.gallery && images.gallery.length > 0 && (
        <ScrollArea className="w-full">
          <div className="flex gap-2">
            {images.gallery.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden"
              >
                <img
                  src={image}
                  alt={`${name} - Image ${index + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default ProductGallery;