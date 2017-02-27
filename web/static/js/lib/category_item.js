export function singleCategory(category) {
  if (category[category.length - 1] === 's') {
    return category.substr(0, category.length - 1);
  }
  return category;
}
export { singleCategory as default };
