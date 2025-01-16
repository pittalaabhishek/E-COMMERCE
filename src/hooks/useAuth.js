// import { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../store/atoms';
import { supabase } from '../Auth/Client';
import { message } from 'antd';

const useAuth = () => {
    const setUser = useSetRecoilState(userState);
  
  const user = useRecoilValue(userState);

  // Listen to auth state changes and update the user state
  

  // Login function
  const login = async (email, password) => {
      try {
        await supabase.auth.signInWithPassword({
          email,
          password,
        });
  
        // if (error) throw error;
        // if (!session?.user) {
        //   message.error('No user found. Please check your credentials');
        //   return;
        // }
  
        // console.log('Session after login:', session);
        // setUser(session.user);
      } catch (error) {
        console.error('Login error:', error);
        message.error(error.message || 'Login failed.');
        throw error;
      }
    };

  // Registration function
  const register = async (email, password, name, phone) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, phone }
        }
      });
  
      if (error) throw error;
      
      if (data?.user) {
        message.success('Registration successful! Please verify your email.');
        return data; // Return the auth data
      } else {
        throw new Error('Registration failed - no user data returned');
      }
  
    } catch (error) {
      console.error('Registration error:', error);
      message.error(error.message || 'Registration failed.');
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
      try {
        await supabase.auth.signOut();
        setUser(null);
        message.success('Successfully logged out!');
      } catch (error) {
        console.error('Logout error:', error);
        message.error(error.message || 'Logout failed.');
      }
    };

  return {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
};

export default useAuth;

