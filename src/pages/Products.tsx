import { Button } from "@/components/ui/button";
import { CardSkeleton } from "@/components/ui/CardSkeleton";
import { CardSkeletonList } from "@/components/ui/CardSkeletonList";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { TProduct } from "@/types/product.types";
import formatQueryParams from "@/utils/formatQueryParams";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ListIcon } from "lucide-react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ProductCardGrid from "../components/ui/ProductCardGrid";
import ProductCardList from "../components/ui/ProductCardList";
import PaginationComponent from "./../components/ui/PaginationComponent";
import { PriceRangeFilter } from "./../components/ui/PriceRangeFilter";
const sortOptions = [
  { name: "Best Rating", value: "rating" },
  { name: "Newest", value: "newest" },
  { name: "Price: Low to High", value: "ASC" },
  { name: "Price: High to Low", value: "DSC" },
];

const Products = () => {
  const filters = useAppSelector((state: RootState) => state.product.filters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const { handleSubmit, control } = useForm();
  const [selectedSort, setSelectedSort] = useState("");
  const [isGridLayout, setIsGridLayout] = useState(true);
  const searchTerm = useAppSelector((state) => state.search.searchTerm);
  const [queryString, setQueryString] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const updateQueryString = useCallback((params: Record<string, unknown>) => {
    const newQueryString = formatQueryParams(params);
    setQueryString(newQueryString);
  }, []);

  useEffect(() => {
    updateQueryString({
      page: currentPage,
    });
  }, [currentPage, updateQueryString]);

  useEffect(() => {
    updateQueryString({
      searchTerm,
    });
  }, [searchTerm, updateQueryString]);

  const toggleLayout = () => {
    setIsGridLayout(!isGridLayout);
  };

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    updateQueryString({ selectedSort: value });
  };

  const handleClearFilters = () => {
    setMinPrice(0);
    setMaxPrice(1000);
    setSelectedSort("");
    updateQueryString({});
  };

  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const onSubmit = (data: Record<string, boolean>) => {
    const selectedFilters: [string, boolean][] = Object.entries(data).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value
    );

    if (minPrice !== 0 || maxPrice !== 1000) {
      updateQueryString({
        selectedFilters,
        minPrice,
        maxPrice,
      });
    } else {
      updateQueryString({
        selectedFilters,
      });
    }
  };

  const { data, isFetching, isLoading } = useGetAllProductsQuery(queryString, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  if (isFetching) return <p>Fetching...</p>;
  if (isLoading) return <p>Loading...</p>;

  const totalPages = Math.ceil(data?.totalData / 6);

  const products: TProduct[] = data?.data || [];

  return (
    <div className="">
      <div>
        {/* Mobile filter dialog */}
        <Transition show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <TransitionChild
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div className="fixed inset-0 z-40 flex">
              <TransitionChild
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-4 border-t border-gray-200"
                  >
                    <PriceRangeFilter
                      minPrice={0}
                      maxPrice={1000}
                      onPriceChange={handlePriceChange}
                    />
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-b mx-2 border-gray-200 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </DisclosureButton>
                            </h3>
                            <DisclosurePanel className="pt-6">
                              <div className="space-y-4">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <Controller
                                      name={`${section.id}-${option.value}`}
                                      control={control}
                                      defaultValue={option.checked}
                                      render={({ field }) => (
                                        <input
                                          {...field}
                                          id={`filter-${section.id}-${optionIdx}`}
                                          type="checkbox"
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                      )}
                                    />
                                    <label
                                      htmlFor={`filter-${section.id}-${optionIdx}`}
                                      className="ml-3 text-sm text-gray-600"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </DisclosurePanel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                    <div className="flex mt-2 items-center justify-between">
                      <Button
                        type="submit"
                        className="mx-3 rounded-md border border-transparent bg-primary px-3 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                      >
                        Apply Filters
                      </Button>

                      <Button
                        onClick={handleClearFilters}
                        className="mx-3 rounded-md border border-transparent bg-secondary-foreground px-3 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        <main className="mx-auto max-w-7xl px-4 lg:px-0">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              ALl Products
            </h1>
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort By
                </MenuButton>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="container mx-auto p-2">
                      {sortOptions.map((option) => (
                        <MenuItem
                          key={option.value}
                          as="button"
                          className={({ active }) =>
                            `block w-full text-left p-2 text-sm ${
                              active ? "bg-gray-200" : ""
                            } ${
                              option.value === selectedSort
                                ? "font-semibold text-base text-primary"
                                : ""
                            }`
                          }
                          onClick={() => handleSortChange(option.value)}
                        >
                          {option.name}
                          {option.value === selectedSort && (
                            <span className="ml-2 text-primary">✓</span>
                          )}
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                onClick={toggleLayout}
              >
                <span className="sr-only">Toggle layout</span>
                <TooltipProvider>
                  {isGridLayout ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <ListIcon className="h-5 w-5" aria-hidden="true" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Switch to List View</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Squares2X2Icon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Switch to Grid View</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </TooltipProvider>
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form
                className="hidden lg:block"
                onSubmit={handleSubmit(onSubmit)}
              >
                <PriceRangeFilter
                  minPrice={0}
                  maxPrice={1000}
                  onPriceChange={handlePriceChange}
                />
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b mx-2 border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <Controller
                                  name={`${section.id}-${option.value}`}
                                  control={control}
                                  defaultValue={option.checked}
                                  render={({ field }) => (
                                    <input
                                      {...field}
                                      id={`filter-${section.id}-${optionIdx}`}
                                      type="checkbox"
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                  )}
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                ))}
                <div className="flex mt-2 items-center justify-between">
                  <Button
                    type="submit"
                    className="mx-3 rounded-md border border-transparent bg-primary px-3 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Apply Filters
                  </Button>

                  <Button
                    onClick={handleClearFilters}
                    className="mx-3 rounded-md border border-transparent bg-secondary-foreground px-3 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Clear Filters
                  </Button>
                </div>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {isGridLayout ? (
                  isFetching || isLoading ? (
                    <div>
                      <CardSkeleton count={4} />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {products.map((product) => (
                        <ProductCardGrid key={product._id} {...product} />
                      ))}
                    </div>
                  )
                ) : isFetching || isLoading ? (
                  <div>
                    <CardSkeletonList count={3} />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.map((product) => (
                      <ProductCardList key={product._id} {...product} />
                    ))}
                  </div>
                )}

                <PaginationComponent
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Products;
