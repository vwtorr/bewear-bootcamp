import Image from "next/image";
import { Header } from "@/components/ui/common/header";
import { db } from "@/db";
import ProductList from "@/components/ui/common/product-list";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
    variants: true,
  }
  });
  
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
          className="h-auto w-full"
        ></Image>

        <ProductList products={products} title="Mais Vendidos"/>

        <Image
          src="/banner02.png"
          alt="Leve uma vida com estilo"
          height={0}
          width={0}
          sizes="100vm"
          className="h-auto w-full"
        ></Image>
      </div>
    </>
  );
};

export default Home;
