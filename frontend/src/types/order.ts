export type OrderStatus = "Pending" | "Preparing" | "Ready" | "Served";

export type Order = {
  id: number;
  table: number;
  items: OrderItem[];
  status: OrderStatus;
};

export type OrderItem = {
  productId: number;
  name: string;
  quantity: number;
  price: number;
};
