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

export type StoreData = {
  type: string;
  name: string;
  logo: string;
  cover: string;
  sector: string;
  address: string;
  city: string;
  contact: string;
  shipping_policy: string;
  refund_policy: string;
  country: string;
  theme: string;
  payment_methods: string[];
  delivery_methods: string[];
  products: Product[];
};