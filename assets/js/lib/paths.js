export const catalogItemPath = item => `/item/${item.manufacturer}-${encodeURIComponent(item.sku)}`;
export const adminCatalogItemPath = item => `/admin/item/${item.manufacturer}-${encodeURIComponent(item.sku)}`;
