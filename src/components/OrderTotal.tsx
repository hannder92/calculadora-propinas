import { ActionDispatch, useMemo } from "react";
import type { OrderItem } from "../types";
import { formatCurrency } from "../helpers";
import { OrderActions } from "../reducers/order-reducer";

type OrderTotalProps = {
  order: OrderItem[];
  tip: number;
  dispatch: ActionDispatch<[action: OrderActions]>;
};

export default function OrderTotal({ order, tip, dispatch }: OrderTotalProps) {
  const subTotalAmount = useMemo(() => {
    return order.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }, [order]);

  const tipAmount = useMemo(() => {
    return subTotalAmount * tip;
  }, [order, tip]);

  const totalAmount = useMemo(() => {
    return subTotalAmount + tipAmount;
  }, [order, tip]);

  return (
    <>
      <div className="space-y-3">
        <h2 className="font-black text-2xl">Totales y Propina:</h2>
        <p>
          Subtotal a pagar: {""}
          <span className="font-bold"> {formatCurrency(subTotalAmount)}</span>
        </p>

        <p>
          Propina: {""}
          <span className="font-bold"> {formatCurrency(tipAmount)}</span>
        </p>

        <p>
          Total a pagar: {""}
          <span className="font-bold"> {formatCurrency(totalAmount)}</span>
        </p>
      </div>
      <button
        className="w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-10 hover:bg-gray-700"
        disabled={totalAmount === 0}
        onClick={() => dispatch({ type: "place-order" })}
      >
        Guardar Orden
      </button>
    </>
  );
}
