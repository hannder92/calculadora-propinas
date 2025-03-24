import type { ActionDispatch } from "react";
import { OrderActions } from "../reducers/order-reducer";

const tipOptions = [
  {
    id: "tip-10",
    value: 0.1,
    label: "10%",
  },
  {
    id: "tip-20",
    value: 0.2,
    label: "20%",
  },
  {
    id: "tip-50",
    value: 0.5,
    label: "50%",
  },
];

type TipPercentageFormProps = {
  tip: number;
  dispatch: ActionDispatch<[action: OrderActions]>;
};

export default function TipPercentageForm({
  tip,
  dispatch,
}: TipPercentageFormProps) {
  return (
    <div>
      <h3 className="font-black text-2xl">Propina:</h3>

      <form>
        {tipOptions.map((option) => (
          <div key={option.id} className="flex gap-2">
            <label htmlFor="">{option.label}</label>
            <input
              id={option.id}
              type="radio"
              name="tip"
              value={option.value}
              onChange={(e) =>
                dispatch({
                  type: "add-tip",
                  payload: { value: +e.target.value },
                })
              }
              checked={tip === option.value}
            />
          </div>
        ))}
      </form>
    </div>
  );
}
