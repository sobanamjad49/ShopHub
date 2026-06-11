export const getProductImages = (product) => {
  if (product.images?.length) return product.images;

  const url = product.image || '';
  const variants = [
    url,
    url.replace(/w=\d+/, 'w=600').replace(/h=\d+/, 'h=450'),
    url.replace(/w=\d+/, 'w=500').replace(/h=\d+/, 'h=500'),
  ];

  return [...new Set(variants)];
};
