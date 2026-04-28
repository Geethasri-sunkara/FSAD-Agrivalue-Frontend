import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import FarmerDashboard from './pages/FarmerDashboard';
import AddProduct from './pages/AddProduct';

const getRole = () => localStorage.getItem('agriRole');

function ProtectedRoute({ children, allowedRoles }) {
  const role = getRole();
  if (!role) return <Navigate to="/" replace />;
  if (!allowedRoles.includes(role)) {
    return <Navigate to={role === 'farmer' ? '/farmer-dashboard' : '/home'} replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute allowedRoles={['buyer']}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute allowedRoles={['buyer']}>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute allowedRoles={['buyer']}>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/farmer-dashboard"
        element={
          <ProtectedRoute allowedRoles={['farmer']}>
            <FarmerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-product"
        element={
          <ProtectedRoute allowedRoles={['farmer']}>
            <AddProduct />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
