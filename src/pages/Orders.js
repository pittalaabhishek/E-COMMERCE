import React from 'react';
import { Layout, Typography } from 'antd';
import OrderList from '../components/Order/OrderList';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;

const Orders = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Content className="max-w-7xl mx-auto p-4">
      <Title level={2}>My Orders</Title>
      <OrderList />
    </Content>
  );
};

export default Orders;