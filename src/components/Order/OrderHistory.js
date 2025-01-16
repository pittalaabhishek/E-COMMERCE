import React from "react";
import { List, Image, Typography, Divider } from "antd";
import "../../styles/OrderSummary.css";

const { Text, Title } = Typography;

const OrderHistory = ({ order }) => {
  if (!order || !order.order_items || order.order_items.length === 0) {
    return <div className="order-summary-container">No order details available</div>;
  }

  const calculateTotal = () => {
    return order.order_items.reduce((sum, item) => {
      const itemPrice = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;
      return sum + (itemPrice * quantity);
    }, 0);
  };

  const total = calculateTotal();
  const deliveryCharge = total > 500 ? 0 : 40;
  const tax = total * 0.18;
  const finalTotal = total + deliveryCharge + tax;

  return (
    <div className="order-summary-container">
      <List
        className="order-summary-list"
        dataSource={order.order_items}
        renderItem={(item) => (
          <List.Item 
            key={`${order.id}-${item.id}`} 
            className="order-summary-list-item"
          >
            <Image
              className="order-summary-image"
              width={80}
              src={item.products?.image_url || 'fallback-image.png'}
              alt={item.products?.name || 'Product'}
              fallback="fallback-image.png"
            />
            <div className="order-summary-product-details">
              <Text className="order-summary-product-name">
                {item.products?.name || 'Unknown Product'}
              </Text>
              <br />
              <Text className="order-summary-product-category">
                Quantity: {item.quantity || 1}
              </Text>
            </div>
            <Text className="order-summary-product-price">
              ₹{((item.price || 0) * (item.quantity || 1)).toFixed(2)}
            </Text>
          </List.Item>
        )}
      />

      <Divider className="order-summary-divider" />

      <div className="order-summary-total">
        <Title level={5} className="order-summary-total-label">
          Total Amount
        </Title>
        <Title level={5} className="order-summary-total-value">
          ₹{finalTotal.toFixed(2)}
        </Title>
      </div>
    </div>
  );
}

  export default OrderHistory;