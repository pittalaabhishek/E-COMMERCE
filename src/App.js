import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, ConfigProvider } from 'antd';
import { RecoilRoot } from 'recoil';
import './App.css';

// Layout Components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

// Pages
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

// Hooks
import useAuth from './hooks/useAuth';
import { Link } from 'lucide-react';

// Protected Route Component
<Link path="/login"/>
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const theme = {
  token: {
    colorPrimary: '#2874f0',
    borderRadius: 4,
  },
};

const App = () => {
  return (
    <RecoilRoot>
      <ConfigProvider theme={theme}>
        <Router>
          <Layout className="layout-container">
            <Header />
            <Layout.Content className="layout-content"> {/* Offset for fixed header */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } />
                <Route path="/orders" element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/login" element={
                    <Login />
                } />
                {/* <Route path="/login" element={<Login />} /> */}
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout.Content>
            <Footer />
          </Layout>
        </Router>
      </ConfigProvider>
    </RecoilRoot>
  );
};

export default App;
