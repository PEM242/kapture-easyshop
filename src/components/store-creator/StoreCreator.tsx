import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import StoreType from "./StoreType";
import StoreConfig from "./StoreConfig";
import StoreTheme from "./StoreTheme";
import ProductConfig from "./ProductConfig";
import ProgressBar from "./ProgressBar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Store } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { StoreData, Product } from "./types";

interface StoreCreatorProps {
  storeData: StoreData;
  setStoreData: (data: StoreData) => void;
}

const initialStoreData: StoreData = {
  type: "",
  name: "",
  logo: "",
  cover: "",
  sector: "",
  address: "",
  city: "",
  contact: "",
  shipping_policy: "",
  refund_policy: "",
  country: "",
  theme: "",
  payment_methods: [],
  delivery_methods: [],
  products: []
};

const StoreCreator = ({ storeData, setStoreData }: StoreCreatorProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isStoreCreated, setIsStoreCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeStore = async () => {
      setIsLoading(true);
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error("Authentication error:", userError);
          toast({
            title: "Error",
            description: "You must be logged in to create a store.",
            variant: "destructive",
          });
          navigate("/auth");
          return;
        }

        if (!user) {
          navigate("/auth");
          return;
        }

        console.log("Fetching stores for user:", user.id);

        const { data: stores, error: storeError } = await supabase
          .from('stores')
          .select('*')
          .eq('owner_id', user.id)
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (storeError) {
          console.error("Error checking store:", storeError);
          toast({
            title: "Error",
            description: "Unable to load store data.",
            variant: "destructive",
          });
          return;
        }

        const existingStore = stores && stores.length > 0 ? stores[0] : null;

        if (existingStore) {
          console.log("Found existing store:", existingStore);
          
          try {
            const { data: dbProducts = [], error: productsError } = await supabase
              .from('products')
              .select('*')
              .eq('store_id', existingStore.id)
              .eq('is_active', true);

            if (productsError) {
              console.error("Error fetching products:", productsError);
              toast({
                title: "Warning",
                description: "Unable to load store products.",
                variant: "destructive",
              });
            }

            const transformedProducts: Product[] = dbProducts.map(dbProduct => ({
              name: dbProduct.name,
              price: Number(dbProduct.price),
              description: dbProduct.description || "",
              images: {
                main: dbProduct.main_image || "",
                gallery: dbProduct.gallery_images || []
              },
              category: dbProduct.category || "",
              customization: {
                sizes: dbProduct.sizes || [],
                colors: dbProduct.colors || [],
                shoesSizes: dbProduct.shoes_sizes || [],
                customSizes: dbProduct.custom_sizes || "",
                customColors: dbProduct.custom_colors || ""
              },
              discount: {
                type: dbProduct.discount_type as 'percentage' | 'fixed' | null,
                value: Number(dbProduct.discount_value) || 0,
                finalPrice: Number(dbProduct.final_price) || 0
              },
              isActive: dbProduct.is_active,
              inStock: dbProduct.in_stock,
              featured: dbProduct.collection_name ? {
                collectionName: dbProduct.collection_name
              } : undefined
            }));

            setStoreData({
              type: existingStore.type || "",
              name: existingStore.name || "",
              logo: existingStore.logo || "",
              cover: existingStore.cover || "",
              sector: existingStore.sector || "",
              address: existingStore.address || "",
              city: existingStore.city || "",
              contact: existingStore.contact || "",
              shipping_policy: existingStore.shipping_policy || "",
              refund_policy: existingStore.refund_policy || "",
              country: existingStore.country || "",
              theme: existingStore.theme || "",
              payment_methods: existingStore.payment_methods || [],
              delivery_methods: existingStore.delivery_methods || [],
              products: transformedProducts
            });
          } catch (error) {
            console.error("Unexpected error loading products:", error);
            toast({
              title: "Error",
              description: "An error occurred while loading products.",
              variant: "destructive",
            });
          }
        } else {
          console.log("No existing store found, using initial data");
          setStoreData(initialStoreData);
        }
      } catch (error) {
        console.error("Unexpected initialization error:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeStore();
  }, []);

  const handleNext = async () => {
    if (!validateCurrentStep()) return;

    if (currentStep === 4) {
      setIsLoading(true);
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          console.error("Error getting user:", userError);
          toast({
            title: "Error",
            description: "Unable to create store. Please log in again.",
            variant: "destructive",
          });
          return;
        }

        console.log("Creating store for user:", user.id);
        console.log("Store data:", storeData);

        const storeDataForDB = {
          ...storeData,
          owner_id: user.id,
          is_active: true
        };

        const { products, ...storeDataWithoutProducts } = storeDataForDB;

        const { data: store, error: storeError } = await supabase
          .from('stores')
          .insert([storeDataWithoutProducts])
          .select()
          .single();

        if (storeError) {
          console.error("Error creating store:", storeError);
          toast({
            title: "Error",
            description: "Unable to create store. Please try again.",
            variant: "destructive",
          });
          return;
        }

        console.log("Store created successfully:", store);

        if (products && products.length > 0) {
          const productsToInsert = products.map(product => ({
            store_id: store.id,
            name: product.name,
            price: product.price,
            description: product.description,
            main_image: product.images.main,
            gallery_images: product.images.gallery,
            category: product.category,
            sizes: product.customization.sizes,
            colors: product.customization.colors,
            shoes_sizes: product.customization.shoesSizes,
            custom_sizes: product.customization.customSizes,
            custom_colors: product.customization.customColors,
            discount_type: product.discount.type,
            discount_value: product.discount.value,
            final_price: product.discount.finalPrice,
            is_active: product.isActive,
            in_stock: product.inStock,
            collection_name: product.featured?.collectionName
          }));

          const { error: productsError } = await supabase
            .from('products')
            .insert(productsToInsert);

          if (productsError) {
            console.error("Error inserting products:", productsError);
            toast({
              title: "Warning",
              description: "Store created but some products could not be added.",
              variant: "destructive",
            });
          }
        }

        setIsStoreCreated(true);
        toast({
          title: "Success!",
          description: "Your store has been created. Redirecting to dashboard...",
        });
        
        // Use setTimeout to ensure the toast is shown before navigation
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } catch (error) {
        console.error("Unexpected error:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!storeData.type) {
          toast({
            title: "Store type required",
            description: "Please select a store type",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 2:
        if (!storeData.name || !storeData.sector) {
          toast({
            title: "Missing information",
            description: "Please fill in all required fields",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 3:
        if (!storeData.theme || 
            !(storeData.payment_methods || []).length || 
            !(storeData.delivery_methods || []).length) {
          toast({
            title: "Incomplete configuration",
            description: "Please complete your store configuration",
            variant: "destructive",
          });
          return false;
        }
        break;
    }
    return true;
  };

  const renderStep = () => {
    if (isLoading) {
      return <div className="flex justify-center items-center py-8">Loading...</div>;
    }

    switch (currentStep) {
      case 1:
        return <StoreType storeData={storeData} setStoreData={setStoreData} />;
      case 2:
        return <StoreConfig storeData={storeData} setStoreData={setStoreData} />;
      case 3:
        return <StoreTheme storeData={storeData} setStoreData={setStoreData} />;
      case 4:
        return <ProductConfig storeData={storeData} setStoreData={setStoreData} />;
      default:
        return null;
    }
  };

  return (
    <div className="form-container">
      <ProgressBar currentStep={currentStep} totalSteps={4} />
      <div className="mt-8 step-transition">{renderStep()}</div>
      
      {isStoreCreated ? (
        <div className="mt-8 flex flex-col items-center space-y-4">
          <p className="text-lg text-green-600 font-semibold">
            Your store has been created successfully!
          </p>
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Store className="w-5 h-5" />
            Go to dashboard
          </Link>
        </div>
      ) : (
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <Button
              onClick={handlePrevious}
              variant="outline"
              className="flex items-center gap-2"
              disabled={isLoading}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
          )}
          <Button
            onClick={handleNext}
            className="flex items-center gap-2 ml-auto"
            disabled={isLoading}
          >
            {currentStep === 4 ? "Create my store" : "Next"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default StoreCreator;