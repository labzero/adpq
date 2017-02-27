const specificItemImages = {
  'HP|W8E26UP': '/images/products/everyday-computing-hp-laptop.jpg',
  'DELL|210-AFXL': '/images/products/everyday-computing-dell-desktop.jpg',
  'HP|X1U91UP': '/images/products/powerhouse-hp-laptop.jpg',
  'DELL|210-AFXK': '/images/products/powerhouse-dell-desktop.jpg',
  'DELL|210-AFTT': '/images/products/travel-dell.jpg',
  'HP|F5A53AA#ABA': '/images/products/thin-client-hp.jpg'
};

const manufacturerCategoryImages = {
  'HP|Laptops': '/images/products/everyday-computing-hp-laptop.jpg',
  'HP|Desktops': '/images/products/powerhouse-dell-desktop.jpg',
  'DELL|Laptops': '/images/products/travel-dell.jpg',
  'DELL|Desktops': '/images/products/everyday-computing-dell-desktop.jpg'
};

export function catalogItemImage(item) {
  let image = '/images/products/everyday-computing-dell-desktop.jpg';
  if (typeof specificItemImages[`${item.manufacturer}|${item.sku}`] !== 'undefined') {
    image = specificItemImages[`${item.manufacturer}|${item.sku}`];
  } else if (typeof manufacturerCategoryImages[`${item.manufacturer}|${item.top_level_category}`] !== 'undefined') {
    image = manufacturerCategoryImages[`${item.manufacturer}|${item.top_level_category}`];
  }
  return image;
}
export { catalogItemImage as default };
