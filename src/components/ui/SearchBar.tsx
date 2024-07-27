import { setSearchTerm } from "@/redux/features/product/searchSlice";
import { useAppDispatch } from "@/redux/hooks";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTermState] = useState("");

  const handleSearch = () => {
    dispatch(setSearchTerm(searchTerm));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermState(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-lg lg:max-w-xs">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div
          className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer"
          onClick={handleSearch}
        >
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-500 hover:text-black"
            aria-hidden="true"
          />
        </div>
        <input
          id="search"
          name="search"
          className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 ring-1 ring-inset ring-gray-400 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Search"
          type="search"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchBar;
