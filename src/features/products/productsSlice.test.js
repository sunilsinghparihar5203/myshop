import { describe, it, expect, beforeEach } from 'vitest'
import productsReducer, { 
  fetchProducts,
  clearProducts,
  selectAllProducts,
  selectProductsStatus,
  selectProductsError
} from './productsSlice'

describe('productsSlice', () => {
  let initialState

  beforeEach(() => {
    initialState = {
      items: [],
      status: 'idle',
      error: null
    }
  })

  it('should return initial state', () => {
    expect(productsReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle clearProducts', () => {
    const stateWithProducts = {
      items: [{ id: 1, title: 'Test' }],
      status: 'succeeded',
      error: null
    }
    const action = clearProducts()
    const state = productsReducer(stateWithProducts, action)

    expect(state.items).toEqual([])
    expect(state.status).toBe('idle')
    expect(state.error).toBe(null)
  })

  it('should handle fetchProducts.pending', () => {
    const action = { type: fetchProducts.pending.type }
    const state = productsReducer(initialState, action)

    expect(state.status).toBe('loading')
    expect(state.error).toBe(null)
  })

  it('should handle fetchProducts.fulfilled', () => {
    const mockProducts = [{ id: 1, title: 'Test Product' }]
    const action = { type: fetchProducts.fulfilled.type, payload: mockProducts }
    const state = productsReducer(initialState, action)

    expect(state.status).toBe('succeeded')
    expect(state.items).toEqual(mockProducts)
  })

  it('should handle fetchProducts.rejected', () => {
    const errorMessage = 'Failed to fetch'
    const action = { type: fetchProducts.rejected.type, payload: errorMessage }
    const state = productsReducer(initialState, action)

    expect(state.status).toBe('failed')
    expect(state.error).toBe(errorMessage)
  })

  it('should select products correctly', () => {
    const mockState = { products: initialState }
    expect(selectAllProducts(mockState)).toEqual([])
  })

  it('should select products status correctly', () => {
    const mockState = { products: initialState }
    expect(selectProductsStatus(mockState)).toBe('idle')
  })

  it('should select products error correctly', () => {
    const mockState = { products: initialState }
    expect(selectProductsError(mockState)).toBe(null)
  })
})
