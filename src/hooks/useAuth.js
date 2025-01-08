// import { useEffect } from 'react';
// import { useSetRecoilState, useRecoilValue } from 'recoil';
// import { userState } from '../store/atoms';
// // import { supabase } from '../services/supabase';
// import { supabase } from '../Auth/Client';
// import { message } from 'antd';
// // import { serviceSupabase } from '../services/supabase'; // Ensure this is configured with service role key

// const useAuth = () => {
//   const setUser = useSetRecoilState(userState);
//   const user = useRecoilValue(userState);

//   // Listen to auth state changes and update the user state
//   useEffect(() => {
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       async (_event, session) => {
//         console.log('Auth state changed:', _event, session);

//         if (session) {
//           try {
//             const { data: profile, error: profileError } = await supabase
//               .from('users')
//               .select('*')
//               .eq('id', session.user.id)
//               .single();

//             if (profileError) {
//               console.error('Error fetching user profile:', profileError);
//               setUser(session.user); // Fallback to session data if profile fetch fails
//             } else {
//               setUser({ ...session.user, ...profile }); // Merge session data with profile
//             }
//           } catch (error) {
//             console.error('Error in auth state listener:', error);
//           }
//         } else {
//           setUser(null); // Clear user state on logout
//         }
//       }
//     );

//     return () => {
//       subscription.unsubscribe(); // Cleanup subscription on unmount
//     };
//   }, [setUser]);

//   // Login function
//   const login = async (email, password) => {
//     console.log("This is inside useauth")
//     try {
//       const { data: { session }, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });
//       if (error) throw error;
//       else {
//         console.log('just signed in');
//       }

//       // if(!user) {
//       //   message.error('no user found. Please check your credentials');
//       //   return;
//       // }
//       if(!session.user) {
//         message.error('no user found. Please check your credentials');
//         return;
//       }

//       message.success('Successfully logged in!');
//       console.log('Session after login:', session);

//       setUser(session.user);
//       // User state will automatically update via onAuthStateChange listener
//     } catch (error) {
//       console.error('Login error:', error);
//       message.error(error.message || 'Login failed.');
//       throw error; // Re-throw error for further handling in the component
//     }
//   };

//   // Registration function
//   const register = async (email, password, name, phone) => {
//     try {
//       const { data: authData, error: authError } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           data: {
//             name,
//             phone,
//           },
//         },
//       });

//       if (authError) throw authError;

//       if (authData.user) {
//         const { error: profileError } = await supabase //serviceS
//           .from('users')
//           .insert([
//             {
//               id: authData.user.id,
//               email,
//               name,
//               phone,
//               created_at: new Date().toISOString(),
//             },
//           ]);

//         if (profileError) {
//           console.error('Error creating user profile:', profileError);
//           throw profileError;
//         }

//         message.success('Registration successful! Please verify your email.');
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       message.error(error.message || 'Registration failed.');
//       throw error;
//     }
//   };

//   // Logout function
//   const logout = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;

//       setUser(null); // Clear user state
//       message.success('Successfully logged out!');
//     } catch (error) {
//       console.error('Logout error:', error);
//       message.error(error.message || 'Logout failed.');
//     }
//   };

//   return {
//     user,
//     login,
//     register,
//     logout,
//     isAuthenticated: !!user,
//   };
// };

// export default useAuth;
import { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../store/atoms';
import { supabase } from '../Auth/Client';
import { message } from 'antd';

const useAuth = () => {
  const setUser = useSetRecoilState(userState);
  const user = useRecoilValue(userState);

  // Listen to auth state changes and update the user state
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log('Auth state changed:', _event, session);

        if (session) {
          try {
            const { data: profile, error: profileError } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profileError) {
              console.error('Error fetching user profile:', profileError);
              setUser(session.user); // Fallback to session data if profile fetch fails
            } else {
              setUser({ ...session.user, ...profile }); // Merge session data with profile
            }
          } catch (error) {
            console.error('Error in auth state listener:', error);
          }
        } else {
          setUser(null); // Clear user state on logout
        }
      }
    );

    return () => {
      subscription.unsubscribe(); // Cleanup subscription on unmount
    };
  }, [setUser]);

  // Login function
  const login = async (email, password) => {
      try {
        const { data: { session }, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
  
        if (error) throw error;
        if (!session?.user) {
          message.error('No user found. Please check your credentials');
          return;
        }
  
        message.success('Successfully logged in!');
        console.log('Session after login:', session);
        setUser(session.user);
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
  // const register = async (email, password, name, phone) => {
  //   try {
  //     // First create auth user
  //     const { data: authData, error: authError } = await supabase.auth.signUp({
  //       email,
  //       password,
  //     });
      
  //     if (authError) throw authError;
  
  //     // Wait a brief moment to ensure auth is completed
  //     await new Promise(resolve => setTimeout(resolve, 1000));
  
  //     // Then create profile
  //     if (authData.user) {
  //       const { error: profileError } = await supabase
  //         .from('users')
  //         .upsert([  // Using upsert instead of insert
  //           {
  //             id: authData.user.id,
  //             email,
  //             name,
  //             phone,
  //             created_at: new Date().toISOString(),
  //           },
  //         ], 
  //         { onConflict: 'id' });  // Handle if row already exists
  
  //       if (profileError) {
  //         console.error('Profile creation error:', profileError);
  //         throw profileError;
  //       }
  //     }
  
  //     message.success('Registration successful! Please verify your email.');
  //   } catch (error) {
  //     console.error('Registration error:', error);
  //     message.error(error.message || 'Registration failed.');
  //     throw error;
  //   }
  // };

  // Logout function
  const logout = async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
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

