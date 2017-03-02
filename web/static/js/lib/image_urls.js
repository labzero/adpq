const specificItemImages = {
  'HP|W8E26UP': 'everyday-computing-hp-laptop',
  'DELL|210-AFXL': 'everyday-computing-dell-desktop',
  'HP|X1U91UP': 'powerhouse-hp-laptop',
  'DELL|210-AFXK': 'powerhouse-dell-desktop',
  'DELL|210-AFTT': 'travel-dell',
  'HP|F5A53AA#ABA': 'thin-client-hp'
};

const manufacturerCategoryImages = {
  'HP|Laptops': 'everyday-computing-hp-laptop',
  'HP|Desktops': 'Desktops-Workstation',
  'DELL|Laptops': 'travel-dell',
  'DELL|Desktops': 'everyday-computing-dell-desktop'
};

const categoryImages = {
  'Components-Memory': true,
  'Components-Processors': true,
  'Components-Storage Devices': true,
  'Components-Video Cards': true,
  'Desktops-All in One': true,
  'Desktops-Performance': true,
  'Desktops-Standard': true,
  'Desktops-Thin Client': true,
  'Desktops-Workstation': true,
  'Laptops-Performance': true,
  'Laptops-Standard': true,
  'Laptops-Ultralight': true,
  'Laptops-Workstation': true,
  'Peripherals-Cables & Adapters': true,
  'Peripherals-Cases & Bags': true,
  'Peripherals-Displays': true,
  'Peripherals-Docking Stations': true,
  'Peripherals-Headsets Microphones & Speakers': true,
  'Peripherals-Keyboards & Mice': true,
  'Peripherals-Mounting': true
};

export function catalogItemImage(item) {
  let image = 'Components-Storage Devices';
  if (typeof specificItemImages[`${item.manufacturer}|${item.sku}`] !== 'undefined') {
    image = specificItemImages[`${item.manufacturer}|${item.sku}`];
  } else if (typeof categoryImages[`${item.top_level_category}-${item.simple_category}`] !== 'undefined') {
    image = `${item.top_level_category}-${item.simple_category}`;
  } else if (typeof manufacturerCategoryImages[`${item.manufacturer}|${item.top_level_category}`] !== 'undefined') {
    image = manufacturerCategoryImages[`${item.manufacturer}|${item.top_level_category}`];
  }
  return `/images/products/${encodeURIComponent(image)}.jpg`;
}
export { catalogItemImage as default };
