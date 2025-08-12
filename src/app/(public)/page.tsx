import Image from "next/image";

import CategorySelector from "@/components/common/category-selector";
import PartnerBrands from "@/components/common/partner-brands";
import ProductsList from "@/components/common/products-list";
import { getCategories } from "@/data/categories/get";
import {
  getNewlyCreatedProducts,
  getProductsWithVariants,
} from "@/data/products/get";
import { getSession } from "@/data/session/get";

import SignInGoogleDialog from "../components/sign-in-google-dialog";

const Home = async () => {
  const [products, newlyCreatedProducts, categories, session] =
    await Promise.all([
      getProductsWithVariants(),
      getNewlyCreatedProducts(),
      getCategories(),
      getSession(),
    ]);

  return (
    <div className="space-y-6">
      {(!session || !session?.user) && <SignInGoogleDialog />}

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
