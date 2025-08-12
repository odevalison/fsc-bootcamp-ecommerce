import Image from "next/image";
import Link from "next/link";

import { db } from "@/db";
import { cn } from "@/lib/utils";

import Cart from "./cart";
import Menu from "./menu";

const getCategories = async () => {
  return await db.query.categoryTable.findMany({});
};

const Header = async ({ className }: { className?: string }) => {
  const categories = await getCategories();

  return (
    <header
      className={cn(
        "flex items-center justify-between bg-white p-5",
        className,
      )}
    >
      <Link href="/">
        <Image
          priority
          src="/logo.svg"
          alt="BEWEAR"
          width={100}
          height={26.14}
        />
      </Link>

      <div className="flex items-center gap-4">
        <Cart />
        <Menu categories={categories} />
      </div>
    </header>
  );
};

export default Header;
