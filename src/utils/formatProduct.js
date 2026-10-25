export function normalizeProduct(product) {
  return {
    id: product.id,
    name: product.name || product.title || 'Candle',
    price: Number(product.price ?? 0),
    imageUrl: product.imageUrl || product.image || product.photoUrl || '',
    rating: Number(product.rating ?? 5),
    ...product,
  }
}

export function withFallbackImage(product, fallbackImage) {
  if (product.imageUrl) return product
  return { ...product, imageUrl: fallbackImage }
}
