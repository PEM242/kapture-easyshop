import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { StoreData } from "../types";

export const useStoreCreation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStoreCreation = async (storeData: StoreData) => {
    try {
      setIsLoading(true);
      console.log("Starting store creation process...");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("User not authenticated");
      }

      // Create store
      const { data: store, error: storeError } = await supabase
        .from("stores")
        .insert([
          {
            owner_id: user.id,
            type: storeData.type,
            name: storeData.name,
            logo: storeData.logo,
            cover: storeData.cover,
            sector: storeData.sector,
            address: storeData.address,
            city: storeData.city,
            contact: storeData.contact,
            shipping_policy: storeData.shipping_policy,
            refund_policy: storeData.refund_policy,
            country: storeData.country,
            theme: storeData.theme,
            payment_methods: storeData.payment_methods,
            delivery_methods: storeData.delivery_methods,
            is_active: true,
          },
        ])
        .select()
        .single();

      if (storeError) {
        console.error("Store creation error:", storeError);
        throw storeError;
      }

      console.log("Store created successfully:", store);

      // Create products
      if (storeData.products && storeData.products.length > 0) {
        const productsToInsert = storeData.products.map((product) => ({
          store_id: store.id,
          name: product.name,
          price: product.price,
          description: product.description,
          main_image: product.images.main,
          gallery_images: product.images.gallery,
          category: product.category,
          sizes: product.customization.sizes || [],
          colors: product.customization.colors || [],
          shoes_sizes: product.customization.shoesSizes || [],
          custom_sizes: product.customization.customSizes,
          custom_colors: product.customization.customColors,
          discount_type: product.discount.type,
          discount_value: product.discount.value,
          final_price: product.discount.finalPrice,
          is_active: product.isActive,
          in_stock: product.inStock,
          collection_name: product.featured?.collectionName,
        }));

        const { error: productsError } = await supabase
          .from("products")
          .insert(productsToInsert);

        if (productsError) {
          console.error("Products creation error:", productsError);
          throw productsError;
        }

        console.log("Products created successfully");
      }

      // Clean and encode store name
      const cleanStoreName = storeData.name.trim().replace(/\s+/g, '-');
      const encodedStoreName = encodeURIComponent(cleanStoreName);
      const storeUrl = `/s/${encodedStoreName}`;
      
      console.log("Clean store name:", cleanStoreName);
      console.log("Encoded store name:", encodedStoreName);
      console.log("Store URL:", storeUrl);

      // Show success toast
      toast({
        title: "Boutique créée avec succès !",
        description: "Redirection vers votre boutique...",
      });

      // Navigate with a slight delay to ensure toast is visible
      setTimeout(() => {
        console.log("Navigating to:", storeUrl);
        navigate(storeUrl, { replace: true });
      }, 100);

      return { success: true };

    } catch (error) {
      console.error("Error creating store:", error);
      toast({
        title: "Erreur lors de la création",
        description: "Une erreur est survenue lors de la création de votre boutique.",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleStoreCreation,
    isLoading,
  };
};