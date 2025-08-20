import { Header } from "@/components/ui/common/header";
import Image from "next/image";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { formatCentsToBRL } from "@/helpers/money";
import { Button } from "@/components/ui/button";
import ProductList from "@/components/ui/common/product-list";
import Footer from "@/components/ui/common/footer";
import VariantSelector from "./components/variants-selector";
import ProductActions from "./components/product-actions";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;

  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });

  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <Header />

      
        {/* Mobile Layout */}
        <div className="flex flex-col space-y-6 lg:hidden">
          <div className="relative h-[300px] w-full overflow-hidden rounded-3xl">
            <Image
              src={productVariant.imageUrl}
              alt={productVariant.name}
              sizes="100vw"
              width={0}
              height={0}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-4 px-5">
            <VariantSelector
              selectedVariantSlug={productVariant.slug}
              variants={productVariant.product.variants}
            />

            <div>
              <h1 className="text-lg font-semibold">
                {productVariant.product.name}
              </h1>
              <h3 className="text-muted-foreground text-sm">
                {productVariant.name}
              </h3>
              <h3 className="mt-2 text-lg font-semibold">
                {formatCentsToBRL(productVariant.priceInCents)}
              </h3>
            </div>

            <ProductActions productVariantId={productVariant.id} />

            <div className="border-t pt-6">
              <h3 className="mb-3 font-semibold">Descrição</h3>
              <p className="leading-relaxed text-gray-600">
                {productVariant.product.description}
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:mx-auto lg:flex lg:max-w-7xl lg:gap-12 lg:px-8 lg:py-8">
          {/* Image Section */}
          <div className="max-w-2xl flex-1">
            <div className="aspect-square overflow-hidden rounded-3xl bg-gray-100">
              <Image
                src={productVariant.imageUrl}
                alt={productVariant.name}
                sizes="(max-width: 768px) 100vw, 50vw"
                width={600}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="max-w-xl flex-1 space-y-8">
            <div>
              <h1 className="mb-2 text-3xl font-bold">
                {productVariant.product.name}
              </h1>
              <h2 className="text-muted-foreground mb-4 text-lg">
                {productVariant.name}
              </h2>
              <div className="text-2xl font-bold">
                {formatCentsToBRL(productVariant.priceInCents)}
              </div>
            </div>

            <VariantSelector
              selectedVariantSlug={productVariant.slug}
              variants={productVariant.product.variants}
            />

            <ProductActions productVariantId={productVariant.id} />

            <div className="border-t pt-6">
              <h3 className="mb-3 font-semibold">Descrição</h3>
              <p className="leading-relaxed text-gray-600">
                {productVariant.product.description}
              </p>
            </div>
          </div>
        </div>

        {/* Related Products - Centralized and Single */}
        <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProductList title="Talvez você goste" products={likelyProducts} />
        </div>
  
    </>
  );
};

export default ProductVariantPage;