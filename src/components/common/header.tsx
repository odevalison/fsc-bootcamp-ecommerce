import Image from "next/image";
import Link from "next/link";

import Cart from "./cart";
import Menu from "./menu";

const Header = () => {
  return (
    <>
      <header className="flex items-center justify-between p-5">
        <Link href="/">
          <Image
            priority
            src="/logo.svg"
            alt="BEWEAR"
            width={100}
            height={26.14}
          />
        </Link>

        <div className="flex items-center gap-2">
          <Menu />
          <Cart />
        </div>
      </header>
    </>
  );
};

export default Header;
