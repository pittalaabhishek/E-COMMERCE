import React from "react";
import { Card, Button, Typography, Divider } from "antd";
import { useRecoilValue } from "recoil";
import { cartState } from "../../store/atoms";
import { useNavigate } from "react-router-dom";
import "../../styles/CartSummary.css";

const { Text, Title } = Typography;

const CartSummary = () => {
  const cart = useRecoilValue(cartState);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.products?.price * (item?.quantity || 1),
    0
  );

  const deliveryCharge = total > 500 ? 0 : 40;
  const tax = total * 0.18; // 18% GST
  const finalTotal = total + deliveryCharge + tax;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <Card className="cart-summary-card">
      <div className="cart-summary-container">
        <Title level={4} className="cart-summary-title">
          Price Details
        </Title>
        <Divider className="cart-summary-divider" />

        <div>
          <div className="cart-summary-item">
            <Text className="cart-summary-item-label">
              Price ({cart.length} items)
            </Text>
            <Text className="cart-summary-item-value">
              ₹{total.toFixed(2)}
            </Text>
          </div>

          <div className="cart-summary-item">
            <Text className="cart-summary-item-label">
              Delivery Charges
            </Text>
            <Text 
              className={`cart-summary-item-value ${
                deliveryCharge === 0 ? 'cart-summary-item-free' : ''
              }`}
            >
              {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
            </Text>
          </div>

          <div className="cart-summary-item">
            <Text className="cart-summary-item-label">GST</Text>
            <Text className="cart-summary-item-value">
              ₹{tax.toFixed(2)}
            </Text>
          </div>

          <Divider className="cart-summary-divider" />

          <div className="cart-summary-total">
            <Title level={5} className="cart-summary-total-label">
              Total Amount
            </Title>
            <Title level={5} className="cart-summary-total-value">
              ₹{finalTotal.toFixed(2)}
            </Title>
          </div>

          <Button
            className="cart-summary-checkout-btn"
            type="primary"
            size="large"
            block
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CartSummary;