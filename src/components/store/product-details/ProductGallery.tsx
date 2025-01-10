import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: {
    main: string;
    gallery?: string[];
  };
  name: string;
}

const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const allImages = [images.main, ...(images.gallery || [])].filter(Boolean);

  return (
    <div className="space-y-4">
      <Carousel className="w-full">
        <CarouselContent>
          {allImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="aspect-square relative">
                <img
                  src={image}
                  alt={`${name} - Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {allImages.map((image, index) => (
            <button
              key={index}
              className="w-20 h-20 flex-shrink-0"
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover rounded-md"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;