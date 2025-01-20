import React from "react";
import { Card, Typography, Divider } from "antd";
import { useRecoilValue } from "recoil";
import { cartState } from "../../store/atoms";

const { Text, Title } = Typography;

const OrderSummary = () => {
  const cart = useRecoilValue(cartState);

  const total = cart.reduce(
    (sum, item) => sum + item.products?.price * (item?.quantity || 1),
    0
  );

  const deliveryCharge = total > 500 ? 0 : 40;
  const tax = total * 0.18;
  const finalTotal = total + deliveryCharge + tax;

  return (
    <Card className="cart-summary-card">
      <div className="cart-summary-container">
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
        </div>
      </div>
    </Card>
  );
};

export default OrderSummary;