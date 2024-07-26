import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { ShoppingCartIcon, StarIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import MobileMenuButton from "./MobileMenuButton";
import NavLogo from "./NavLogo";
import TooltipIcons from "./ToolTipIcons";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const menuItems = [
  { name: "Home", to: "/" },
  { name: "Products", to: "/products" },
  { name: "About Us", to: "/about-us" },
  { name: "Contact Us", to: "/contact-us" },
];
const iconsConfig = [
  { icon: StarIcon, path: "/wishlist", tooltipText: "Wishlist", item: 5 },
  { icon: ShoppingCartIcon, path: "/cart", tooltipText: "Cart", item: 0 },
];

const SearchBar = () => (
  <div className="w-full max-w-lg lg:max-w-xs">
    <label htmlFor="search" className="sr-only">
      Search
    </label>
    <div className="relative">
      <div className=" absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer">
        <MagnifyingGlassIcon
          className="h-5 w-5 text-gray-500 hover:text-black"
          aria-hidden="true"
        />
      </div>
      <input
        id="search"
        name="search"
        className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3  ring-1 ring-inset ring-gray-400 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Search"
        type="search"
      />
    </div>
  </div>
);

const MenuItemsComponent = () => (
  <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
    {menuItems.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className={({ isActive }: { isActive: boolean }) =>
          classNames(
            isActive
              ? "border-primary text-green-700"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
            "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
          )
        }
      >
        {item.name}
      </NavLink>
    ))}
  </div>
);

export default function Navbar() {
  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-4 lg:px-8">
            <div className="flex h-24 items-center justify-between">
              <div className="flex px-2 lg:px-0">
                <NavLogo />
                <MenuItemsComponent />
              </div>
              <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                <SearchBar />
              </div>
              <div className="flex items-center lg:hidden">
                <MobileMenuButton open={open} />
              </div>
              <div className="hidden lg:ml-4 lg:flex lg:items-center">
                <TooltipIcons
                  className="flex items-center justify-center gap-2"
                  icons={iconsConfig}
                  isMobile={false}
                />
                <Menu as="div" className="relative ml-4 flex-shrink-0">
                  <div>
                    <MenuButton className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full border-2 border-indigo-500"
                        src="https://img.icons8.com/officel/32/test-account.png"
                        alt="test-account"
                      />
                    </MenuButton>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                        {({ active }) => (
                          <NavLink
                            to={"/dashboard/home"}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Dashboard
                          </NavLink>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <DisclosurePanel className="lg:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {menuItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }: { isActive: boolean }) =>
                    classNames(
                      isActive
                        ? "border-primary bg-indigo-50 text-green-700"
                        : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800",
                      "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
            <div className="flex flex-col gap-3 px-4">
              <TooltipIcons
                className={"flex flex-col gap-3"}
                icons={iconsConfig}
                isMobile={true}
              />
              <div>
                <img
                  className="h-8 w-8 rounded-full border-2 border-indigo-500"
                  src="https://img.icons8.com/officel/32/test-account.png"
                  alt="test-account"
                />
              </div>
              <div className="mt-3 space-y-1">
                <DisclosureButton
                  as={NavLink}
                  to={"/contact-us"}
                  className="block text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  Dashboard
                </DisclosureButton>
              </div>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
