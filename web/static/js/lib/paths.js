export const catalogItemPath = item => `/item/${item.manufacturer}-${encodeURIComponent(item.sku)}`;
export { catalogItemPath as default };
