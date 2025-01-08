// // import React from 'react';
// // import { Layout, Card, Form, Input, Button, Typography, message } from 'antd';
// // import { UserOutlined, LockOutlined } from '@ant-design/icons';
// // import { Link, useNavigate } from 'react-router-dom';
// // import useAuth from '../hooks/useAuth';
// // import '../styles/Login.css';

// // const { Content } = Layout;
// // const { Title, Text } = Typography;

// // const Login = () => {
// //   const { login } = useAuth();
// //   const navigate = useNavigate();

// //   const onFinish = async (values) => {
// //     try {
// //       await login(values.email, values.password);
// //       navigate('/', { replace: true });
// //     } catch (error) {
// //       message.error('Login failed. Please check your credentials.');
// //     }
// //   };

// //   return (
// //     <Content className="flex justify-center items-center min-h-screen bg-gray-50">
// //       <Card className="w-full max-w-md">
// //         <div className="text-center mb-8">
// //           <Title level={2}>Welcome Back</Title>
// //           <Text type="secondary">Please login to your account</Text>
// //         </div>

// //         <Form
// //           name="login"
// //           onFinish={onFinish}
// //           layout="vertical"
// //         >
// //           <Form.Item
// //             name="email"
// //             rules={[
// //               { required: true, message: 'Please input your email!' },
// //               { type: 'email', message: 'Please enter a valid email!' }
// //             ]}
// //           >
// //             <Input 
// //               prefix={<UserOutlined />} 
// //               placeholder="Email" 
// //               size="large" 
// //             />
// //           </Form.Item>

// //           <Form.Item
// //             name="password"
// //             rules={[{ required: true, message: 'Please input your password!' }]}
// //           >
// //             <Input.Password
// //               prefix={<LockOutlined />}
// //               placeholder="Password"
// //               size="large"
// //             />
// //           </Form.Item>

// //           <Form.Item>
// //             <Button type="primary" htmlType="submit" block size="large">
// //               Log In
// //             </Button>
// //           </Form.Item>

// //           <div className="text-center">
// //             <Text>Don't have an account? </Text>
// //             <Link to="/register">Register now</Link>
// //           </div>
// //         </Form>
// //       </Card>
// //     </Content>
// //   );
// // };

// // export default Login;

// import React, { useState } from 'react';
// import { Layout, Card, Form, Input, Button, Typography, message } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import { Link, useNavigate } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';
// // import { supabase } from '../Auth/Client'
// import '../styles/Login.css';
// import { useRecoilState } from 'recoil';
// import { userState } from '../store/atoms';

// const { Content } = Layout;
// const { Title, Text } = Typography;

// const Login = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useRecoilState(userState);

//   // const onFinish = async (values) => {
//   //   setLoading(true); // Start loading
//   //   try {
//   //     await login(values.email, values.password);
//   //     setUser({email: values.email});
//   //     message.success('Login successful!');
//   //     console.log('Current user state', user);
//   //     navigate('/', { replace: true }); // Redirect to home
//   //     setLoading(false);
//   //   } catch (error) {
//   //     console.error('Login error:', error);
//   //     message.error(error?.message || 'Login failed. Please try again.');
//   //   } finally {
//   //     setLoading(false); // Stop loading
//   //   }
//   // };

//   // const onFinish = async (values) => {
//   //   setLoading(true);
//   //   try {
//   //     const {data, error} = await supabase.auth.signInWithPassword({
//   //       email: values.email,
//   //       password: values.password,
//   //     });
//   //     if (error) throw error;

//   //     if (data.user) {
//   //       message.success('SUccessfully Looged in!');
//   //       navigate('/', { replace: true });
//   //     }
//   //   } catch (error) {
//   //     message.error(error.message || 'Failed to Login');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const onFinish = async (values) => {
//       // setLoading(true);
//       // try {
//       //   await login(values.email, values.password);
//       //   setUser({ email: values.email });
//       //   message.success('Successfully Looged in!');
//       //   console.log('Current user state', user);
//       //   navigate('/', { replace: true });
//       // } catch (error) {
//       //   console.log('Login error:', user);
//       //   message.error(error?.message || 'Failed to Login Please try again.');
//       // } finally {
//       //   setLoading(false);
//       // }
//        setLoading(true);
//           try {
//             await login(values.email, values.password);
//             setUser({ email: values.email });
//             message.success('Successfully logged in!');
//             console.log('Current user state', user);
//             navigate('/', { replace: true }); // Redirect to home
//           } catch (error) {
//             console.error('Login error:', error);
//             message.error(error?.message || 'Login failed. Please try again.');
//           } finally {
//             setLoading(false);
//           }
//     };

//   return (
//     <Content className="flex justify-center items-center min-h-screen bg-gray-50">
//       <Card className="w-full max-w-md shadow-lg">
//         <div className="text-center mb-8">
//           <Title level={2}>Welcome Back</Title>
//           <Text type="secondary">Please log in to your account</Text>
//         </div>

//         <Form
//           name="login"
//           onFinish={onFinish}
//           layout="vertical"
//         >
//           <Form.Item
//             name="email"
//             rules={[
//               { required: true, message: 'Please input your email!' },
//               { type: 'email', message: 'Please enter a valid email!' }
//             ]}
//           >
//             <Input 
//               prefix={<UserOutlined />} 
//               placeholder="Email" 
//               size="large" 
//             />
//           </Form.Item>

//           <Form.Item
//             name="password"
//             rules={[{ required: true, message: 'Please input your password!' }]}
//           >
//             <Input.Password
//               prefix={<LockOutlined />}
//               placeholder="Password"
//               size="large"
//             />
//           </Form.Item>

//           <Form.Item>
//             <Button 
//               type="primary" 
//               htmlType="submit" 
//               block 
//               size="large" 
//               loading={loading} // Show spinner during loading
//             >
//               Log In
//             </Button>
//           </Form.Item>

//           <div className="text-center">
//             <Text>Don't have an account? </Text>
//             <Link to="/register">Register now</Link>
//           </div>
//         </Form>
//       </Card>
//     </Content>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { Layout, Card, Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import '../styles/Login.css';
import { useRecoilState } from 'recoil';
import { userState } from '../store/atoms';

const { Content } = Layout;
const { Title, Text } = Typography;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  const onFinish = async (values) => {
    console.log("Before loading started")
    setLoading(true);
    console.log("After loading started")
    try {
      console.log("Before await")
      await login(values.email, values.password);
      console.log("After await")
      setUser({ email: values.email });
      message.success('Successfully logged in!');
      console.log('Current user state', user);
      navigate('/', { replace: true }); // Redirect to home
    } catch (error) {
      console.error('Login error:', error);
      message.error(error?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Content className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-8">
          <Title level={2}>Welcome Back</Title>
          <Text type="secondary">Please log in to your account</Text>
        </div>

        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading} // Show spinner during loading
            >
              Log In
            </Button>
          </Form.Item>

          <div className="text-center">
            <Text>Don't have an account? </Text>
            <Link to="/register">Register now</Link>
          </div>
        </Form>
      </Card>
    </Content>
  );
};

export default Login;

