import React from "react";
import { ShoppingCart, User, CalendarArrowUp } from "lucide-react";
import "../../styles/Header.css";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { message, Input } from "antd";
import { supabase } from "../../Auth/Client";
import { loginState, userNameState, cartState } from "../../store/atoms";

const AppHeader = ({ searchQuery, setSearchQuery }) => {
  const isLoggedIn = useRecoilValue(loginState);
  const userName = useRecoilValue(userNameState);
  const navigate = useNavigate();
  const cart = useRecoilValue(cartState);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      message.success("Logged out Successfully");
      navigate("/", { replace: true });
    } catch (error) {
      message.error("Error Logging Out");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const goToCart = () => {
    navigate("/cart");
  };

  const goToOrders = () => {
    navigate("/orders");
  };

  const goToProfile = () => {
    navigate("/MyProfile");
  };

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo-container">
          <a href="/" className="logo">
            Flipkart
          </a>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-container" style={{padding: "0 10px"}}>
            <SearchOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
            <Input
              type="search"
              placeholder="Search for products, brands and more"
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
        </form>

        {/* Actions */}
        <div className="actions">
          {isLoggedIn ? (
            <>
              {/* User Profile Button */}
              <button className="action-button" onClick={goToProfile}>
                <User className="icon" />
                <span>{userName}</span>
              </button>
              <button className="action-button" onClick={goToOrders}>
                <CalendarArrowUp className="icon" />
                <span>My Orders</span>
              </button>

              {/* Cart Button */}
              <button className="action-button" onClick={goToCart}>
                <div className="cart-container">
                  <ShoppingCart className="icon" />
                  {cart.length > 0 && (
                    <span className="cart-count">{cart.length}</span>
                  )}
                </div>
                Cart
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="action-button logout-button"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={handleLogin} className="login-button">
                Login
              </button>

              <button onClick={handleRegister} className="register-button">
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
