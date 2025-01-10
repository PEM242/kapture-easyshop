export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customer: string;
  total: number;
  date: string;
  status: "non traité" | "traité";
  phone: string;
  address: string;
  payment: string;
  delivery: string;
  items: OrderItem[];
}