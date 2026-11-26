import { useState } from "react";
import "./App.css";
import type { Order, OrderStatus } from "./types/order";
import OrderCard from "./components/OrderCard";
import { AnimatePresence } from "motion/react";

const nextStatus: Record<OrderStatus, OrderStatus | null> = {
  Pending: "Preparing",
  Preparing: "Ready",
  Ready: "Served",
  Served: null,
};

function App() {
  //The consts
  const [orders, setOrders] = useState<Order[]>([]);
  const [table, setTable] = useState("");
  const pendingOrders = orders.filter((order) => order.status === "Pending");
  const preparingOrders = orders.filter(
    (order) => order.status === "Preparing",
  );
  const readyOrders = orders.filter((order) => order.status === "Ready");
  const servedOrders = orders.filter((order) => order.status === "Served");

  //in app Functions
  function addOrder() {
    const newOrder: Order = {
      id: Date.now(),
      table: Number(table),
      items: [
        {
          productId: 4,
          name: "Pasta Carbonara",
          quantity: 2,
          price: 17.34,
        },
        {
          productId: 4,
          name: "Pasta Carbonara",
          quantity: 1,
          price: 17,
        },
      ],
      status: "Pending",
    };

    setOrders((previousOrders) => [...previousOrders, newOrder]);
    setTable("");
  }

  function updateOrderStatus(orderId: number, newStatus: OrderStatus) {
    setOrders((previousOrders) =>
      previousOrders.map((order) => {
        if (order.id === orderId && nextStatus[order.status] === newStatus) {
          return { ...order, status: newStatus };
        }

        return order;
      }),
    );
  }

  //Return
  return (
    <main>
      <h1>Restaurant Dashboard</h1>

      <h2>Ενεργές παραγγελίες: {orders.length - servedOrders.length}</h2>
      <div className="order-entry">
        <label className="table-field">
          Αριθμός τραπεζιού
          <input
            type="number"
            value={table}
            onChange={(event) => setTable(event.target.value)}
          />
        </label>
        <button onClick={addOrder}>Νέα παραγγελία</button>
      </div>

      <h2>Λίστα παραγγελιών</h2>

      <div className="orders-board">
        <div className="orders-column">
          <h2>Pending ({pendingOrders.length})</h2>
          <AnimatePresence initial={false}>
            {pendingOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusChange={updateOrderStatus}
              />
            ))}
          </AnimatePresence>
        </div>
        <div className="orders-column">
          <h2>Preparing ({preparingOrders.length})</h2>
          <AnimatePresence>
            {preparingOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusChange={updateOrderStatus}
              />
            ))}
          </AnimatePresence>
        </div>
        <div className="orders-column">
          <h2>Ready ({readyOrders.length})</h2>
          <AnimatePresence initial={false}>
            {readyOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusChange={updateOrderStatus}
              />
            ))}
          </AnimatePresence>
        </div>
        <div className="orders-column">
          <h2>Served ({servedOrders.length})</h2>
          <AnimatePresence>
            {servedOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusChange={updateOrderStatus}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

export default App;
