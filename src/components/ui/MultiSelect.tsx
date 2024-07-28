import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";

interface MultiSelectProps {
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: (options: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  return (
    <Listbox value={selectedOptions} onChange={setSelectedOptions} multiple>
      {({ open }) => (
        <>
          <div className="relative mt-1">
            <ListboxButton className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
              <span className="block truncate">
                {selectedOptions.length === 0
                  ? "Select options"
                  : selectedOptions.join(", ")}
              </span>
            </ListboxButton>
            <ListboxOptions
              className={`absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50 ${
                open ? "block" : "hidden"
              }`}
            >
              {options.map((item, index) => (
                <ListboxOption
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-primary text-white" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default MultiSelect;
