import { DisclosureButton } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";

const MobileMenuButton = ({ open }: { open: boolean }) => {
  return (
    <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
      <span className="sr-only">Open main menu</span>
      {open ? (
        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
      ) : (
        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
      )}
    </DisclosureButton>
  );
};

export default MobileMenuButton;
