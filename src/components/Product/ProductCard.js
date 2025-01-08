import React from 'react';
import { Card, Button, Typography, Rate } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { cartState, userState } from '../../store/atoms';
import { addToCart } from '../../services/supabase';
import { message } from 'antd';

const { Meta } = Card;
const { Text } = Typography;

const ProductCard = ({ product }) => {
  const setCart = useSetRecoilState(cartState);
  const user = useRecoilValue(userState);

  const handleAddToCart = async () => {
    if (!user) {
      message.error('Please login to add items to cart');
      return;
    }

    try {
      const { error } = await addToCart(user.id, product.id);
      if (error) throw error;
      
      setCart((prevCart) => [...prevCart, { products: product }]);
      message.success('Added to cart successfully!');
    } catch (error) {
      message.error('Failed to add to cart');
    }
  };

  return (
    <Card
      hoverable
      cover={
        <img
          alt={product.name}
          src={product.image_url}
          className="h-48 object-contain p-4"
        />
      }
      actions={[
        <Button 
          type="primary" 
          icon={<ShoppingCartOutlined />}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      ]}
    >
      <Link to={`/product/${product.id}`}>
        <Meta
          title={product.name}
          description={
            <>
              <Text strong>₹{product.price}</Text>
              <br />
              <Rate disabled defaultValue={4} />
              <Text className="ml-2 text-gray-500">
                ({Math.floor(Math.random() * 500 + 100)})
              </Text>
            </>
          }
        />
      </Link>
    </Card>
  );
};

export default ProductCard;