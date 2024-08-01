import { Link } from "react-router-dom";
import TitleDescriptionBlock from "../customUI/TitleDescriptionBlock";

const categories = [
  {
    name: "Tents & Shelters",
    imageSrc:
      "https://adventureshop.mt/cdn/shop/files/2024_ClassicAir_Orange_High33-large.jpg?v=1713452170&width=600",
  },
  {
    name: "Backpacks",
    imageSrc:
      "https://adventureshop.mt/cdn/shop/files/LA_INDO_NEW6_TREK_e5e585b0-aaa2-4f9f-8744-0847cb7e597e.jpg?v=1718197658&width=600",
  },
  {
    name: "Outdoor Clothing",
    imageSrc:
      "https://adventureshop.mt/cdn/shop/products/the-north-face-m-descendit-jacket-20b-tnf-nf0a4qww-flare-1.jpg?v=1696169277&width=500",
  },
  {
    name: "Ski & Snowports",
    imageSrc:
      "https://adventureshop.mt/cdn/shop/files/1_BasileEtOscar_VillardDeLans_Rossignol_HD_LouisGarnier-15-3500x5247-8f7acbc3-f500-4068-8381-fdd7c9b5b195.png?v=1698678464&width=600",
  },
  {
    name: "Footwear",
    imageSrc:
      "https://adventureshop.mt/cdn/shop/files/SS23-Rossignol-Online-Shop-banner-SHOES.png?v=1682516045&width=600",
  },
];

export default function CategorySection() {
  return (
    <div className="pb-4">
      <div className="py-12 sm:py-20 xl:mx-auto xl:max-w-7xl xl:px-8">
        <div className="px-2">
          <TitleDescriptionBlock
            title="Explore Our Categories"
            description=" Browse through our diverse range of categories to find the products
            that best suit your needs. From outdoor gear to camping essentials,
            we have everything you need for your next adventure."
          />
        </div>

        <Link
          to={"/products"}
          className="hidden text-sm text-end font-semibold text-primary hover:text-indigo-500 sm:block"
        >
          Browse all categories
          <span aria-hidden="true"> &rarr;</span>
        </Link>

        <div className="mt-4 flow-root">
          <div className="-my-2">
            <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
              <div className="min-w-screen-xl absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={"/products"}
                    className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                  >
                    <span aria-hidden="true" className="absolute inset-0">
                      <img
                        src={category.imageSrc}
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                    />
                    <span className="relative mt-auto text-center text-xl font-bold text-white">
                      {category.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 px-4 sm:hidden">
          <Link
            to={"/products"}
            className="block text-sm font-semibold text-primary hover:text-indigo-500"
          >
            Browse all categories
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
