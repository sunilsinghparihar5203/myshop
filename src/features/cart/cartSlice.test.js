import { describe, it, expect, beforeEach } from 'vitest'
import cartReducer, { 
  addToCart, 
  removeFromCart, 
  toggleCart, 
  clearCart,
  selectCartItems,
  selectCartTotal,
  selectCartOpen
} from './cartSlice'

describe('cartSlice', () => {
  let initialState

  beforeEach(() => {
    initialState = {
      items: [],
      totalAmount: 0,
      isCartOpen: false
    }
  })

  it('should return initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should add item to cart', () => {
    const product = { id: 1, title: 'Test Product', price: 10, thumbnail: 'test.jpg' }
    const action = addToCart(product)
    const state = cartReducer(initialState, action)

    expect(state.items).toHaveLength(1)
    expect(state.items[0]).toMatchObject(product)
    expect(state.items[0].quantity).toBe(1)
    expect(state.totalAmount).toBe(10)
  })

  it('should remove item from cart', () => {
    const product = { id: 1, title: 'Test Product', price: 10, thumbnail: 'test.jpg' }
    const stateWithItem = cartReducer(initialState, addToCart(product))
    const action = removeFromCart(stateWithItem.items[0].cartItemId)
    const finalState = cartReducer(stateWithItem, action)

    expect(finalState.items).toHaveLength(0)
    expect(finalState.totalAmount).toBe(0)
  })

  it('should toggle cart open state', () => {
    const action = toggleCart()
    const state = cartReducer(initialState, action)
    
    expect(state.isCartOpen).toBe(true)
    
    const state2 = cartReducer(state, action)
    expect(state2.isCartOpen).toBe(false)
  })

  it('should clear cart', () => {
    const product = { id: 1, title: 'Test Product', price: 10, thumbnail: 'test.jpg' }
    const stateWithItems = cartReducer(initialState, addToCart(product))
    const action = clearCart()
    const finalState = cartReducer(stateWithItems, action)

    expect(finalState.items).toHaveLength(0)
    expect(finalState.totalAmount).toBe(0)
  })

  it('should select cart items correctly', () => {
    const mockState = { cart: initialState }
    expect(selectCartItems(mockState)).toEqual([])
  })

  it('should select cart total correctly', () => {
    const mockState = { cart: initialState }
    expect(selectCartTotal(mockState)).toBe(0)
  })

  it('should select cart open state correctly', () => {
    const mockState = { cart: initialState }
    expect(selectCartOpen(mockState)).toBe(false)
  })
})
