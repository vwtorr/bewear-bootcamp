"use client";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  const HandleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev -1 : prev));
  };

  const HandleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Quantidade</h3>
      <div className="items-center rounted-lg flex w-[100px] justify-between border">
        <Button onClick= {HandleDecrement} size="icon" variant="ghost">
          <MinusIcon></MinusIcon>
        </Button>
        <p>{quantity}</p>
        <Button onClick= {HandleIncrement} size="icon" variant="ghost">
          <PlusIcon></PlusIcon>
        </Button>
      </div>
    </div>
  );
};

export default QuantitySelector;
