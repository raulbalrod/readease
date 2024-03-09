export function applyFilters(filters) {
  const { categorie, status, sort } = filters;
  let query = {};

  if (categorie) {
    query.categories = categorie;
  }
  if (status) {
    query.status = status;
  }

  let sortOption = {};
  if (sort === "az") {
    sortOption = { title: 1 };
  } else if (sort === "za") {
    sortOption = { title: -1 };
  } else if (sort === "pageCountAsc") {
    sortOption = { pageCount: 1 };
  } else if (sort === "pageCountDesc") {
    sortOption = { pageCount: -1 };
  } else if (sort === "rateDesc") {
    sortOption = { rating: -1 };
  } else if (sort === "rateAsc") {
    sortOption = { rating: 1 };
  }

  return { ...query, sortOption };
}
