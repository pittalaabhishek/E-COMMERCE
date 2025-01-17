import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../../Auth/Client';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = async (email, password, name, phone) => {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (error) {
        console.error(error.message);
      }
  
      //Insert user details into the users table
      const { error: insertError } = await supabase
        .from('users')
        .insert([{ id: user.id, created_at: new Date(), email, name, phone }]);
  
      if (insertError) {
        console.error(insertError.message); // Throw an error if insertion fails
      }
  
      return user; // Return the user object if registration is successful
    };

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    }

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        message.success('Successfully logged in!');
      } catch (error) {
        message.error(error.message);
        throw error;
      }
    };

  const value = {
    signUp: register,
    signIn: login,
    signOut: () => supabase.auth.signOut(),
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};