import React, { useEffect, useState } from "react";
import { supabase } from "./Auth/Client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { Layout, ConfigProvider } from "antd";
import "./App.css";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { userState, loginState, userNameState, cartState } from "./store/atoms";

// Layout Components
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

// Pages
import Home from "./pages/Home";
import ProductDetailPage from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import MyProfile from "./pages/MyProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import { getCartItems } from "./services/supabase";

// Hooks
import useAuth from "./hooks/useAuth";
// import ProductDetail from "./components/Product/ProductDetail";

// Protected Route Component
<Link path="/login" />;
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const theme = {
  token: {
    colorPrimary: "#2874f0",
    borderRadius: 4,
  },
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const setUser = useSetRecoilState(userState);
  const setUserName = useSetRecoilState(userNameState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [cart, setCart] = useRecoilState(cartState);
  const user = useRecoilValue(userState);
  // const [setLoading] = useState(true);

  useEffect(() => {
    console.log("before fetching cart details");
    const fetchCart = async () => {
      if (!user?.id) {
        console.log("No user ID available, skipping fetch");
        // setLoading(false);
        return;
      }

      try {
        console.log("Fetching cart for user ID:", user.id);
        const { data, error } = await getCartItems(user.id);
        if (error) {
          console.error("Error fetching cart:", error);
          throw error;
        }

        console.log("Cart data received:", data);
        if (data) {
          setCart(data);
          console.log("Filtered valid cart items:");
        } else {
          console.log("Invalid cart data structure:", data);
          setCart([]);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        // setLoading(false);
      }
    };
    if (user?.id) {
      fetchCart();
    }
  }, [user, setCart]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log("Auth state changed:", _event, session);

      if (session) {
        try {
          setUser({ ...session.user }); // Merge session data with profile
          setIsLoggedIn(true);
          setUserName(session.user.user_metadata.name);
          console.log("name inside useEffect", session.user.name);
        } catch (error) {
          console.error("Error in auth state listener:", error);
        }
      } else {
        setUser(null); // Clear user state on logout
        setIsLoggedIn(false);
        setUserName("");
      }
    });

    return () => {
      subscription.unsubscribe(); // Cleanup subscription on unmount
    };
  }, [isLoggedIn]);

  return (
    <ConfigProvider theme={theme}>
      <Router>
        <Layout className="layout-container">
          <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Layout.Content className="layout-content">
            {" "}
            {/* Offset for fixed header */}
            <Routes>
              <Route path="/" element={<Home searchQuery={searchQuery} />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route path="/orders" element={<Orders />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/MyProfile"
                element={
                  <ProtectedRoute>
                    <MyProfile />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              {/* <Route path="/login" element={<Login />} /> */}
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout.Content>
          <Footer />
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

export default App;
