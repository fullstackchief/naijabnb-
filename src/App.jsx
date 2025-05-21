import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './contexts/AuthContext'
import ErrorBoundary from './components/utils/ErrorBoundary'
import LoadingSpinner from './components/utils/LoadingSpinner'
import ScrollToTop from './components/utils/ScrollToTop'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

// Lazy load pages
const HomePage = React.lazy(() => import('./pages/HomePage'))
const ListingsPage = React.lazy(() => import('./pages/ListingsPage'))
const ListingDetailPage = React.lazy(() => import('./pages/ListingDetailPage'))
const LoginPage = React.lazy(() => import('./pages/LoginPage'))
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'))
const UserDashboardPage = React.lazy(() => import('./pages/UserDashboardPage'))
const HostDashboardPage = React.lazy(() => import('./pages/HostDashboardPage'))
const AgentDashboardPage = React.lazy(() => import('./pages/AgentDashboardPage'))
const AdminDashboardPage = React.lazy(() => import('./pages/AdminDashboardPage'))
const TermsPage = React.lazy(() => import('./pages/TermsPage'))
const PrivacyPage = React.lazy(() => import('./pages/PrivacyPage'))
const HelpCenterPage = React.lazy(() => import('./pages/HelpCenterPage'))

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="large" />
  </div>
)

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ScrollToTop />
        <Header />
        <AnimatePresence mode="wait">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/listings" element={<ListingsPage />} />
              <Route path="/listings/:id" element={<ListingDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<UserDashboardPage />} />
              <Route path="/host/dashboard" element={<HostDashboardPage />} />
              <Route path="/agent/dashboard" element={<AgentDashboardPage />} />
              <Route path="/admin/*" element={<AdminDashboardPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/help" element={<HelpCenterPage />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
        <Footer />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App