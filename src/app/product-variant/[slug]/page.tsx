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
import QuantitySelector from "./components/quantity-selector";

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
        }
      } 
    },
  });

  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = productVariant.product.categoryId
    ? await db.query.productTable.findMany({
        where: eq(productTable.categoryId, productVariant.product.categoryId),
        with: { variants: true },
      })
    : [];

  return (
    <>
      <Header />
      
      <div className="min-h-screen">
        {/* Mobile Layout */}
        <div className="flex flex-col space-y-6 lg:hidden">
          <div className="relative h-[300px] w-full rounded-3xl overflow-hidden">
            <Image
              src={productVariant.imageUrl}
              alt={productVariant.name}
              sizes="100vw"
              width={0}
              height={0}
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="px-5 space-y-4">
            <VariantSelector variants={productVariant.product.variants} />
            
            <div>
              <h1 className="text-lg font-semibold">
                {productVariant.product.name}
              </h1>
              <h3 className="text-muted-foreground text-sm">
                {productVariant.name}
              </h3>
              <h3 className="text-lg font-semibold mt-2">
                {formatCentsToBRL(productVariant.priceInCents)}
              </h3>
            </div>
            
            <QuantitySelector />
            
            <div className="flex flex-col space-y-4">
              <Button className="rounded-full" size="lg" variant="outline">
                Adicionar à sacola
              </Button>
              <Button className="rounded-full" size="lg">
                Comprar agora
              </Button>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">
                {productVariant.product.description}
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex lg:max-w-7xl lg:mx-auto lg:px-8 lg:py-8 lg:gap-12">
          {/* Image Section */}
          <div className="flex-1 max-w-2xl">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100">
              <Image
                src={productVariant.imageUrl}
                alt={productVariant.name}
                sizes="(max-width: 768px) 100vw, 50vw"
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex-1 max-w-xl space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {productVariant.product.name}
              </h1>
              <h2 className="text-muted-foreground text-lg mb-4">
                {productVariant.name}
              </h2>
              <div className="text-2xl font-bold">
                {formatCentsToBRL(productVariant.priceInCents)}
              </div>
            </div>

            <VariantSelector variants={productVariant.product.variants} />
            
            <QuantitySelector />
            
            <div className="space-y-4">
              <Button className="w-full rounded-full" size="lg" variant="outline">
                Adicionar à sacola
              </Button>
              <Button className="w-full rounded-full" size="lg">
                Comprar agora
              </Button>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-3">Descrição</h3>
              <p className="text-gray-600 leading-relaxed">
                {productVariant.product.description}
              </p>
            </div>
          </div>
        </div>

        {/* Related Products - Centralized and Single */}
        <div className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductList title="Talvez você goste" products={likelyProducts} />
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default ProductVariantPage;