interface QueryParamsOptions {
  selectedFilters?: [string, boolean][];
  selectedSort?: string;
  minPrice?: number;
  maxPrice?: number;
  searchTerm?: string;
  page?: number;
  limit?: number;
}

const formatQueryParams = ({
  selectedFilters = [],
  selectedSort = "",
  minPrice = 0,
  maxPrice = Infinity,
  searchTerm = "",
  page = 1,
  limit = 6,
}: QueryParamsOptions = {}): string => {
  const params = new URLSearchParams();

  if (selectedFilters.length) {
    selectedFilters.forEach(([key, value]) => {
      if (value) {
        const [filterType, filterValue] = key.split("-");
        params.append(filterType, filterValue);
      }
    });
  }

  if (selectedSort) {
    params.append("sort", selectedSort);
  }

  if (minPrice !== 0 || maxPrice !== Infinity) {
    params.append("minPrice", minPrice.toString());
    params.append("maxPrice", maxPrice.toString());
  }

  if (searchTerm) {
    params.append("search", searchTerm);
  }

  // Add pagination parameters
  params.append("page", page.toString());
  params.append("limit", limit.toString());

  return params.toString();
};

export default formatQueryParams;
