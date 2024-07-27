const formatQueryParams = (
  selectedFilters: [string, boolean][],
  sortOption: string,
  minPrice: number,
  maxPrice: number,
  searchTerm: string
): string => {
  const params = new URLSearchParams();

  selectedFilters.forEach(([key, value]) => {
    if (value) {
      const [filterType, filterValue] = key.split("-");
      params.append(filterType, filterValue);
    }
  });

  if (sortOption) {
    params.append("sort", sortOption);
  }

  if (minPrice !== undefined && maxPrice !== undefined) {
    params.append("minPrice", minPrice.toString());
    params.append("maxPrice", maxPrice.toString());
  }

  if (searchTerm) {
    params.append("search", searchTerm);
  }

  return params.toString();
};

export default formatQueryParams;
