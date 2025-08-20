import ProductItem from "@/components/ui/common/product-item";
import { InferResult } from "drizzle-orm";

interface CategoryProductsProps {
  products: InferResult<"productTable", { with: { variants: true } }>[];
}

const CategoryProducts = ({ products }: CategoryProductsProps) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          textConteinerClassName="max-w-full"
        />
      ))}
    </div>
  );
};

export default CategoryProducts; 