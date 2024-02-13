export const paginationItems = (req, items) => {
    const { query: { limit, offset } } = req;
    const first = parseInt(offset, 10);
    const step = parseInt(limit, 10);
    const last = first + step;

    const lastPage = Math.floor((items.total - 1) / step) * step;
    const nextPage = Math.floor(last / step) * step;
    const prevPage = Math.floor((first - step) / step) * step;

    return {
        links: {
            base: `${req.headers.host}${req.baseUrl}`,
            first: first !== 0 ? `?offset=0&limit=${step}` : undefined,
            previous: first >= step ? `?offset=${prevPage}&limit=${step}` : undefined,
            next: first < lastPage ? `?offset=${nextPage}&limit=${step}` : undefined,
            last: first < lastPage ? `?offset=${lastPage}&limit=${step}` : undefined,
        },
        offset,
        limit,
        total: items.total,
        pages: Math.ceil(items.total / step),
        results: items.values,
    };
};