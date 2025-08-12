import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { cn } from "@/lib/utils";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  textConteinerClassName?: string;
}

const ProductItem = ({ product, textConteinerClassName }: ProductItemProps) => {
  const firstVariant = product.variants[0];

  return (
    <Link
      href={`/product-variant/${firstVariant.slug}`}
      className="flex w-64 flex-shrink-0 flex-col gap-4"
    >
      <Image
        src={firstVariant.imageUrl}
        alt={firstVariant.name}
        sizes="100vw"
        width={0}
        height={0}
        className="h-auto w-full rounded-3xl"
      />
      <div
        className={
          (cn("flex max-w-[200px] flex-col gap-1"), textConteinerClassName)
        }
      >
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="text-muted-foreground truncate text-xs font-medium">
          {product.description}
        </p>
        <p className="truncate text-sm font-semibold">
          {formatCentsToBRL(firstVariant.priceInCents)}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
