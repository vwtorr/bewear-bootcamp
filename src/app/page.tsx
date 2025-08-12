import Image from "next/image";
import { Header } from "@/components/ui/common/header";
import { db } from "@/db";
import ProductList from "@/components/ui/common/product-list";
import { productTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import CategorySelector from "@/components/ui/common/category-selector";
import Footer from "@/components/ui/common/footer";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });
  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header />
      <div className="space-y-6 px-5">
        <Image
          src="/banner01.png"
          alt="Leve uma vida com estilo"
          height={0}
          width={0}
          sizes="100vm"
          className="h-auto w-full rounded-3xl"
        ></Image>

        <ProductList products={products} title="Mais Vendidos" />

        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>

        <Image
          src="/banner02.png"
          alt="Leve uma vida com estilo"
          height={0}
          width={0}
          sizes="100vm"
          className="rounded-4xl h-auto w-full"
        ></Image>

        <ProductList products={newlyCreatedProducts} title="Novidades" />
      </div>
      <Footer />
    </>
  );
};

export default Home;
