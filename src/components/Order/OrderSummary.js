import React from 'react';
import { List, Image, Typography, Divider } from 'antd';

const { Text, Title } = Typography;

const OrderSummary = ({ order }) => {
  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={order.order_items}
        renderItem={(item) => (
          <List.Item>
            <div className="flex w-full">
              <Image
                width={80}
                src={item.products.image_url}
                alt={item.products.name}
                className="object-contain"
              />
              <div className="ml-4 flex-grow">
                <Text strong>{item.products.name}</Text>
                <br />
                <Text type="secondary">
                  Category: {item.products.categories.name}
                </Text>
              </div>
              <div className="text-right">
                <Text strong>₹{item.price}</Text>
              </div>
            </div>
          </List.Item>
        )}
      />
      
      <Divider />
      
      <div className="flex justify-between">
        <Title level={5}>Total Amount</Title>
        <Title level={5}>₹{order.total_amount}</Title>
      </div>
    </div>
  );
};

export default OrderSummary;