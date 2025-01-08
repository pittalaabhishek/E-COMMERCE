import React from 'react';
import { Card, Button, Typography, Divider } from 'antd';
import { useRecoilValue } from 'recoil';
import { cartState } from '../../store/atoms';
import { cartTotalSelector } from '../../store/selectors';
import { useNavigate } from 'react-router-dom';

const { Text, Title } = Typography;

const CartSummary = () => {
  const cart = useRecoilValue(cartState);
  const total = useRecoilValue(cartTotalSelector);
  const navigate = useNavigate();

  const deliveryCharge = total > 500 ? 0 : 40;
  const tax = total * 0.18; // 18% GST
  const finalTotal = total + deliveryCharge + tax;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Card>
      <Title level={4}>Price Details</Title>
      <Divider />

      <div className="space-y-4">
        <div className="flex justify-between">
          <Text>Price ({cart.length} items)</Text>
          <Text>₹{total.toFixed(2)}</Text>
        </div>

        <div className="flex justify-between">
          <Text>Delivery Charges</Text>
          <Text type={deliveryCharge === 0 ? "success" : "secondary"}>
            {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
          </Text>
        </div>

        <div className="flex justify-between">
          <Text>GST</Text>
          <Text>₹{tax.toFixed(2)}</Text>
        </div>

        <Divider />

        <div className="flex justify-between">
          <Title level={5}>Total Amount</Title>
          <Title level={5}>₹{finalTotal.toFixed(2)}</Title>
        </div>

        <Button
          type="primary"
          size="large"
          block
          onClick={handleCheckout}
          disabled={cart.length === 0}
        >
          Proceed to Checkout
        </Button>
      </div>
    </Card>
  );
};

export default CartSummary;