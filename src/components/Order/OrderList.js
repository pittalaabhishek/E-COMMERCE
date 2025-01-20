import React, { useEffect, useState } from 'react';
import { List, Card, Typography, Tag, Spin } from 'antd';
import { useRecoilValue } from 'recoil';
import { userState } from '../../store/atoms';
import { getOrders } from '../../services/supabase';
import OrderHistory from './OrderHistory';

const { Title, Text } = Typography;

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useRecoilValue(userState);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data, error } = await getOrders(user.id);
        if (error) console.error(error);
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'gold',
      processing: 'blue',
      shipped: 'cyan',
      delivered: 'green',
      cancelled: 'red',
    };
    return colors[status] || 'default';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <List
      dataSource={orders}
      renderItem={(order) => (
        <Card className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <Title level={5}>Order #{order.id.slice(0, 8)}</Title>
              <Text type="secondary">
                Placed on {new Date(order.created_at).toLocaleDateString()}
              </Text>
            </div>
            <Tag color={getStatusColor(order.status)}>
              {order.status.toUpperCase()}
            </Tag>
          </div>
          <OrderHistory order={order} />
        </Card>
      )}
    />
  );
};

export default OrderList;