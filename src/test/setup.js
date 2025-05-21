import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock environment variables
vi.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(),
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn()
    }
  }
}))

// Mock Intersection Observer
const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
})
window.IntersectionObserver = mockIntersectionObserver