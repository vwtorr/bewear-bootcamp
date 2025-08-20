import Image from "next/image";
import { Header } from "@/components/ui/common/header";
import { db } from "@/db";
import ProductList from "@/components/ui/common/product-list";
import { productTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import CategorySelector from "@/components/ui/common/category-selector";
import PartnerBrands from "@/components/ui/partner-brands";

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
          sizes="100vw"
          className="mx-auto h-auto w-full max-w-[1400px] rounded-3xl"
        />

        <PartnerBrands />

        <ProductList products={products} title="Mais Vendidos" />

        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:justify-center lg:items-stretch">
          <div className="flex flex-col gap-6 lg:w-1/2 h-full">
            <Image
              src="/tenis1.png"
              alt="Leve uma vida com estilo"
              height={0}
              width={0}
              sizes="100vm"
              className="rounded-3xl object-cover h-1/2 w-full"
            ></Image>

            <Image
              src="/tenis2.png"
              alt="Leve uma vida com estilo"
              height={0}
              width={0}
              sizes="100vm"
              className="rounded-3xl object-cover h-1/2 w-full"
            ></Image>
          </div>

          <Image
            src="/banner02.png"
            alt="Leve uma vida com estilo"
            height={600}
            width={1200}
            className="rounded-3xl object-cover lg:w-1/2"
          ></Image>
        </div>

        <ProductList products={newlyCreatedProducts} title="Novidades" />
      </div>
    </>
  );
};

export default Home;
