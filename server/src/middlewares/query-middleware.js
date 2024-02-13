export function parseQuery(req, res, next){
    const { limit, offset, ...rest } = req.query;
    req.query = {
        limit: parseInt(limit, 10) || 10,
        offset: parseInt(offset, 10) || 0,
        ...rest,
    };
    next();
}