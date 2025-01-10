export type Product = {
  name: string;
  price: number;
  description: string;
  images: {
    main: string;
    gallery: string[];
  };
  category: string;
  customization: {
    sizes?: string[];
    colors?: string[];
    shoesSizes?: string[];
    customSizes?: string;
    customColors?: string;
  };
  discount: {
    type: 'percentage' | 'fixed' | null;
    value: number;
    finalPrice: number;
  };
  isActive: boolean;
  inStock: boolean;
  featured?: {
    collectionName: string;
  };
};

export type ProductFormState = {
  name: string;
  price: number;
  description: string;
  images: {
    main: string;
    gallery: string[];
  };
  category: string;
  customization: {
    sizes?: string[];
    colors?: string[];
    shoesSizes?: string[];
    customSizes?: string;
    customColors?: string;
  };
  discount: {
    type: 'percentage' | 'fixed' | null;
    value: number;
    finalPrice: number;
  };
  isActive: boolean;
  inStock: boolean;
  isFeatured: boolean;
  collectionName: string;
};

export type StoreData = {
  type: string;
  name: string;
  logo: string;
  cover: string;
  sector: string;
  address: string;
  contact: string;
  shippingPolicy: string;
  refundPolicy: string;
  country: string;
  theme: string;
  paymentMethods: string[];
  deliveryMethods: string[];
  products: Product[];
};