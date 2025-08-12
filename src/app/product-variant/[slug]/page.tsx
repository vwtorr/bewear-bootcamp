import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";


interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

 
const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {product: true}, 
  });
  if(!productVariant){
    return notFound();
  }
   return (<h1>test</h1> );
}


export default ProductVariantPage;