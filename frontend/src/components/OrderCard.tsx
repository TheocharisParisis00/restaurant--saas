import type { Order, OrderStatus } from "../types/order";
import { motion } from "motion/react";

type OrderCardProps = {
  order: Order;
  onStatusChange: (odrerId: number, newStatus: OrderStatus) => void;
};

function OrderCard({ order, onStatusChange }: OrderCardProps) {
  const total = order.items.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);
  return (
    <motion.div
      className="order-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <h3>Παραγγελία #{order.id}</h3>
      <p>Τραπέζι: {order.table}</p>
      <p>
        Προιόντα:
        {order.items.map((item) => (
          <div key={item.productId} className="order-item">
            <span>
              {item.quantity} X {item.name}
            </span>
            <span>{-(item.quantity * item.price).toFixed(2)}$</span>
          </div>
        ))}
        <p className="order-total">Σύνολο: {total.toFixed(2)} €</p>
      </p>
      <p>Κατάσταση: {order.status}</p>
      {order.status === "Pending" && (
        <button onClick={() => onStatusChange(order.id, "Preparing")}>
          Start
        </button>
      )}
      {order.status === "Preparing" && (
        <button onClick={() => onStatusChange(order.id, "Ready")}>Ready</button>
      )}
      {order.status === "Ready" && (
        <button onClick={() => onStatusChange(order.id, "Served")}>
          Serve
        </button>
      )}
    </motion.div>
  );
}

export default OrderCard;
