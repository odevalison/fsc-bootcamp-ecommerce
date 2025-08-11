import { desc } from "drizzle-orm";
import { headers } from "next/headers";
import Image from "next/image";

import CategorySelector from "@/components/common/category-selector";
import PartnerBrands from "@/components/common/partner-brands";
import ProductsList from "@/components/common/products-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import SignInGoogleDialog from "./components/sign-in-google-dialog";

const getSession = async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
};

const getProducts = async () => {
  return await db.query.productTable.findMany({
    with: { variants: true },
  });
};

const getNewlyCreatedProducts = async () => {
  return await db.query.productTable.findMany({
    orderBy: desc(productTable.createdAt),
    with: { variants: true },
  });
};

const getCategories = async () => {
  return await db.query.categoryTable.findMany({});
};

const Home = async () => {
  const session = await getSession();

  const products = await getProducts();
  const newlyCreatedProducts = await getNewlyCreatedProducts();
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      {!session?.user && <SignInGoogleDialog />}

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
    </div>
  );
};

export default Home;
