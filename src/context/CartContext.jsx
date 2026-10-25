import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  function addItem(product, quantity = 1) {
    if (!product?.id) {
      throw new Error('A product with an id is required to add it to the cart.')
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error('Cart quantity must be a positive whole number.')
    }

    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id,
      )
      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }
      return [...currentItems, { product, quantity }]
    })
  }

  function removeItem(productId) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId),
    )
  }

  function updateQuantity(productId, quantity) {
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error('Cart quantity must be a positive whole number.')
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    )
  }

  const value = useMemo(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = items.reduce(
      (sum, item) => sum + Number(item.product.price ?? 0) * item.quantity,
      0,
    )

    return { items, itemCount, subtotal, addItem, removeItem, updateQuantity }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Keep the context hook beside its provider for a simple, discoverable API.
// oxlint-disable-next-line react/only-export-components
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
