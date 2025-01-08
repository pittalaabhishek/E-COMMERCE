import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Typography, 
  Rate, 
  Descriptions, 
  Image, 
  Tag,
  Divider,
  message 
} from 'antd';
import { ShoppingCartOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState, cartState } from '../../store/atoms';
import { addToCart } from '../../services/supabase';

const { Title, Text } = Typography;

const ProductDetail = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const user = useRecoilValue(userState);
  const setCart = useSetRecoilState(cartState);

  const handleAddToCart = async () => {
    if (!user) {
      message.error('Please login to add items to cart');
      return;
    }

    setLoading(true);
    try {
      const { error } = await addToCart(user.id, product.id);
      if (error) throw error;
      
      setCart((prevCart) => [...prevCart, { ...product, id: product.id }]);
      message.success('Added to cart successfully!');
    } catch (error) {
      message.error('Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <Card>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <Image
              src={product.image_url}
              alt={product.name}
              className="object-contain"
            />
          </div>

          <div className="md:w-1/2">
            <Title level={2}>{product.name}</Title>
            <Rate disabled defaultValue={4} />
            <Text className="ml-2">
              ({Math.floor(Math.random() * 500 + 100)} ratings)
            </Text>

            <Divider />

            <Title level={3} type="danger">
              ₹{product.price}
            </Title>
            <Tag color="green">In Stock: {product.stock}</Tag>

            <Divider />

            <Descriptions title="Product Details" column={1}>
              <Descriptions.Item label="Category">
                {product.categories.name}
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                {product.description}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <div className="flex gap-4">
              <Button
                type="primary"
                size="large"
                icon={<ShoppingCartOutlined />}
                onClick={handleAddToCart}
                loading={loading}
              >
                Add to Cart
              </Button>
              <Button
                size="large"
                icon={<ThunderboltOutlined />}
                danger
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetail;