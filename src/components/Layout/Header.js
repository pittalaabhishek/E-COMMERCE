import React, { useState, useEffect } from 'react';
import { ShoppingCart, User } from 'lucide-react'; // Keep lucide-react icons
import '../../styles/Header.css'; // Ensure the CSS file is correctly located and styled
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
// import useAuth from '../../hooks/useAuth';
import { message } from 'antd';
import { supabase } from '../../Auth/Client';

const AppHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  //const { login } = useAuth();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { date: { session }} =await supabase.auth.getSession();
        
        if(session) {
          setIsLoggedIn(true);
        
          const { data: userData, error} = await supabase
          .from('users')
          .select('name')
          .eq('id', session.user.id)
          .single();
        
          if (!error && userData) {
            setUserName(userData.name);
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };

    initializeAuth();

    const { data: { subscription }} = supabase.auth.onAuthStateChange( async (event, session) => {
      if (event === 'SIGNED_IN') {
        setIsLoggedIn(true);

        const { data: userData, error } = await supabase
        .from('users')
        .select('name')
        .eq('id', session.user.id)
        .single();

        if (!error && userData) {
          setUserName(userData.name);
        }
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        setUserName('');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);


  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search:', searchQuery);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setIsLoggedIn(false);
      setUserName('');
      message.success('Logged out Successfully');
      navigate('/', { replace: true});
    } catch (error) {
      message.error('Error Logging Out');
    }
  };

  const handleLogin = () => {
      navigate('/login');
    };

  const handleRegister = () => {
    navigate('/register');
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
          <div className="search-container">
            <SearchOutlined style={{ fontSize: '24px', color: '#1890ff' }}/>
            <input
              type="search"
              placeholder="Search for products, brands and more"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {/* <button type="submit" className="search-button">🔍</button> */}
          </div>
        </form>

        {/* Actions */}
        <div className="actions">
          {isLoggedIn ? (
            <>
              {/* User Profile Button */}
              <button className="action-button">
                <User className="icon" />
                <span>{userName}</span>
              </button>

              {/* Cart Button */}
              <button className="action-button" onClick={() => setCartCount(cartCount + 1)}>
                <div className="cart-container">
                  <ShoppingCart className="icon" />
                  {cartCount > 0 && (
                    <span className="cart-count">{cartCount}</span>
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
              <button onClick={handleLogin} className="login-button">Login</button>

              <button onClick={handleRegister} className="register-button">Register</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
