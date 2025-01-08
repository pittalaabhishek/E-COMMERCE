import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Empty } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartState, userState } from '../store/atoms';
import CartItem from '../components/Cart/CartItem';
import CartSummary from '../components/Cart/CartSummary';
import { getCartItems } from '../services/supabase';

const { Content } = Layout;

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useRecoilState(cartState);
  const user = useRecoilValue(userState);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data, error } = await getCartItems(user.id);
        if (error) throw error;
        setCart(data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCart();
    }
  }, [user, setCart]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Empty description="Please login to view your cart" />
      </div>
    );
  }

  return (
    <Content className="max-w-7xl mx-auto p-4">
      <Row gutter={24}>
        <Col xs={24} lg={16}>
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          {cart.length === 0 && !loading && (
            <Empty description="Your cart is empty" />
          )}
        </Col>
        <Col xs={24} lg={8}>
          <CartSummary />
        </Col>
      </Row>
    </Content>
  );
};

export default Cart;