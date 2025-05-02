import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/auth/ProtectedRoute'
import PublicRoute from './components/auth/PublicRoute'
import Loader from './components/common/Loader'
import VerificationResult from './components/scanner/VerificationResult'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const Scanner = lazy(() => import('./pages/Scanner'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const MedicineVerification = lazy(() => import('./pages/MedicineVerification'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
        </Route>
        <Route element={<ProtectedRoute />}>
          
          <Route path="/dashboard" element={<Dashboard />} />,
          <Route path="/verify-medicine" element={<MedicineVerification />} />,
          {/* <Route path="/scanner" element={<Scanner />} />, */}
          
        </Route>
      </Routes>
    </Suspense>
  )
}