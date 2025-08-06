import Image from "next/image";

import { Card, CardContent } from "../ui/card";

const PartnerBrands = () => {
  const partnerBrands = [
    {
      id: 0,
      name: "Nike",
      path: "/nike.svg",
    },
    {
      id: 1,
      name: "Adidas",
      path: "/adidas.svg",
    },
    {
      id: 2,
      name: "Puma",
      path: "/puma.svg",
    },
    {
      id: 3,
      name: "New Balance",
      path: "/new-balance.svg",
    },
    {
      id: 4,
      name: "Converse",
      path: "/converse.svg",
    },
    {
      id: 5,
      name: "Polo",
      path: "/polo.svg",
    },
    {
      id: 6,
      name: "Zara",
      path: "/zara.svg",
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="px-5 font-semibold">Marcas parceiras</h3>

      <div className="flex w-full gap-6 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        {partnerBrands.map((brand) => (
          <div key={brand.id} className="flex flex-col items-center space-y-4">
            <Card className="flex h-[80px] w-[80px] items-center justify-center rounded-3xl">
              <CardContent>
                <Image
                  priority
                  src={brand.path}
                  alt={brand.name}
                  width={30}
                  height={30}
                />
              </CardContent>
            </Card>

            <h3 className="text-xs font-semibold">{brand.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerBrands;
