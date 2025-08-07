import { desc } from "drizzle-orm";
import Image from "next/image";

import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import PartnerBrands from "@/components/common/partner-brands";
import ProductsList from "@/components/common/products-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: desc(productTable.createdAt),
    with: {
      variants: true,
    },
  });
  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header />

      <div className="space-y-6">
        <div className="px-5">
          <Image
            height={0}
            width={0}
            sizes="100vw"
            src="/banner-01.png"
            alt="Leve uma vida com estilo"
            className="h-auto w-full"
          />
        </div>

        <PartnerBrands />

        <ProductsList products={products} title="Mais vendidos" />

        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>

        <div className="px-5">
          <Image
            height={0}
            width={0}
            sizes="100vw"
            src="/banner-02.png"
            alt="Seja autêntico"
            className="h-auto w-full"
          />
        </div>

        <ProductsList products={newlyCreatedProducts} title="Novos produtos" />

        <Footer />
      </div>
    </>
  );
};

export default Home;
