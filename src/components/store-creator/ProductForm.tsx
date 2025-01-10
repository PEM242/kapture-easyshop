import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";
import ProductImages from "./ProductImages";
import ProductVariants from "./ProductVariants";
import BasicFields from "./product-form/BasicFields";
import DiscountSection from "./product-form/DiscountSection";
import ProductOptions from "./product-form/ProductOptions";
import type { Product, ProductFormState } from "./types";

interface ProductFormProps {
  onAddProduct: (product: Product) => void;
  storeType: string;
  initialData?: Product;
}

const ProductForm = ({ onAddProduct, storeType, initialData }: ProductFormProps) => {
  const [newProduct, setNewProduct] = useState<ProductFormState>({
    name: "",
    price: 0,
    description: "",
    images: {
      main: "",
      gallery: [],
    },
    category: "",
    customization: {},
    discount: {
      type: null,
      value: 0,
      finalPrice: 0,
    },
    isActive: true,
    inStock: true,
    isFeatured: false,
    collectionName: "",
  });

  useEffect(() => {
    if (initialData) {
      setNewProduct({
        ...initialData,
        isFeatured: !!initialData.featured,
        collectionName: initialData.featured?.collectionName || "",
      });
    }
  }, [initialData]);

  const { toast } = useToast();

  const handleSubmit = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.images.main) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    const productToAdd: Product = {
      ...newProduct,
      featured: newProduct.isFeatured ? {
        collectionName: newProduct.collectionName
      } : undefined,
      discount: {
        ...newProduct.discount,
        finalPrice: newProduct.discount.finalPrice,
      },
      images: {
        main: newProduct.images.main || "",
        gallery: newProduct.images.gallery || [],
      },
    };

    onAddProduct(productToAdd);
    if (!initialData) {
      setNewProduct({
        name: "",
        price: 0,
        description: "",
        images: {
          main: "",
          gallery: [],
        },
        category: "",
        customization: {},
        discount: {
          type: null,
          value: 0,
          finalPrice: 0,
        },
        isActive: true,
        inStock: true,
        isFeatured: false,
        collectionName: "",
      });
    }
  };

  const handleProductChange = (updates: Partial<ProductFormState>) => {
    setNewProduct(prev => ({
      ...prev,
      ...updates,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <BasicFields
          product={newProduct}
          storeType={storeType}
          onProductChange={handleProductChange}
        />

        <ProductImages
          mainImage={newProduct.images.main}
          galleryImages={newProduct.images.gallery}
          onMainImageChange={(url) =>
            handleProductChange({
              images: { ...newProduct.images, main: url },
            })
          }
          onGalleryImageChange={(urls) =>
            handleProductChange({
              images: { ...newProduct.images, gallery: urls },
            })
          }
        />

        <ProductVariants
          customization={newProduct.customization}
          onChange={(customization) =>
            handleProductChange({ customization })
          }
        />

        <DiscountSection
          discount={newProduct.discount}
          price={newProduct.price}
          onDiscountChange={(discount) =>
            handleProductChange({ discount })
          }
        />

        <ProductOptions
          product={newProduct}
          onProductChange={handleProductChange}
        />

        <Button
          onClick={handleSubmit}
          className="w-full flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Ajouter {storeType === "restaurant" ? "le plat" : "le produit"}
        </Button>
      </div>
    </div>
  );
};

export default ProductForm;