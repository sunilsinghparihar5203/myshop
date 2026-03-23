import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import ProductDetail from './ProductDetail'
import productsReducer from '../features/products/productsSlice'
import cartReducer from '../features/cart/cartSlice'

// Mock the useParams and useNavigate hooks
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({ id: '1' }),
    useNavigate: () => vi.fn()
  }
})

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      products: productsReducer,
      cart: cartReducer
    },
    preloadedState: {
      products: {
        items: [
          { id: 1, title: 'Test Product', price: 10, thumbnail: 'test.jpg', category: 'test', brand: 'test', rating: 4, description: 'Test description', stock: 10, discountPercentage: 5 }
        ],
        status: 'succeeded',
        error: null
      },
      cart: {
        items: [],
        totalAmount: 0,
        isCartOpen: false
      },
      ...initialState
    }
  })
}

const renderWithProviders = (component, { initialState = {}, store = createMockStore(initialState) } = {}) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  )
}

describe('ProductDetail', () => {
  it('should render product details when product is found', () => {
    renderWithProviders(<ProductDetail />)
    
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('₹10')).toBeInTheDocument()
    expect(screen.getByText('Category: test')).toBeInTheDocument()
    expect(screen.getByText('Brand: test')).toBeInTheDocument()
    expect(screen.getByText('Rating: 4 ⭐')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
    expect(screen.getByText('Stock: 10 units available')).toBeInTheDocument()
    expect(screen.getByText('Discount: 5% off')).toBeInTheDocument()
    expect(screen.getByText('Add to Cart')).toBeInTheDocument()
  })

  it('should show "Product not found" when product does not exist', () => {
    const store = createMockStore({
      products: {
        items: [],
        status: 'succeeded',
        error: null
      }
    })
    
    renderWithProviders(<ProductDetail />, { store })
    
    expect(screen.getByText('Product not found')).toBeInTheDocument()
    expect(screen.getByText('Back to Products')).toBeInTheDocument()
  })

  it('should dispatch addToCart when add to cart button is clicked', () => {
    const store = createMockStore()
    renderWithProviders(<ProductDetail />, { store })
    
    const addToCartButton = screen.getByText('Add to Cart')
    fireEvent.click(addToCartButton)
    
    const actions = store.getState().cart.items
    expect(actions).toHaveLength(1)
    expect(actions[0].title).toBe('Test Product')
  })

  it('should show back button', () => {
    renderWithProviders(<ProductDetail />)
    
    expect(screen.getByText('← Back to Products')).toBeInTheDocument()
  })
})
