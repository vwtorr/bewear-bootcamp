import ProductItem from "@/components/ui/common/product-item";

interface CategoryProductsProps {
  products: any[]; // TODO: Define a proper type for product
}

const CategoryProducts = ({ products }: CategoryProductsProps) => {
  return (
    <div className="flex flex-row gap-6 overflow-x-auto">
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