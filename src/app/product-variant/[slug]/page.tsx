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
    with: { product: {
      with: {
        variants:true,
      }
    } },
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
      <div className="flex flex-col space-y-6">
        <div className="relative h-[300px] w-full rounded-3xl">
          <Header />
          <Image
            src={productVariant.imageUrl}
            alt={productVariant.name}
            sizes="100vw"
            width={0}
            height={0}
            className="h-auto w-full object-cover"
          />

          <div className="px-5">
            <VariantSelector variants={productVariant.product.variants} />
          </div>

          <div className="text-lg font-semibold">
            {productVariant.product.name}
            <h3 className="text-muted-foreground text-sm">
              {productVariant.name}
            </h3>
            <h3 className="text-lg font-semibold">
              {formatCentsToBRL(productVariant.priceInCents)}
            </h3>
          </div>

          <div className="px-5">
            <QuantitySelector></QuantitySelector>
          </div>

          <div className="flex flex-col space-y-4 px-5">

            <Button className="rounted-full" size="lg" variant="outline">
              Adicionar à sacola
            </Button>
            <Button className="rounted-full" size="lg">
              Comprar agora
            </Button>
          </div>

          <div className="px-5">
            <p className="text-sm">{productVariant.product.description}</p>
          </div>

          <ProductList title="Talvez você goste" products={likelyProducts}/>

          <Footer/>
        </div> 
      </div>
    </>
  );
};

export default ProductVariantPage;
