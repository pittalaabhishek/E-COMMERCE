import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Typography, Rate, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { cartState, userState } from "../../store/atoms";
import { addToCart } from "../../services/supabase";
import "../../styles/ProductCard.css";

const { Meta } = Card;
const { Text } = Typography;

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const setCart = useSetRecoilState(cartState);
  const user = useRecoilValue(userState);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = useCallback(
    async (e) => {
      // Prevent navigation when clicking add to cart
      if (e) {
        e.stopPropagation();
      }

      // Check if user is logged in
      if (!user) {
        message.error("Please login to add items to cart");
        return;
      }

      // Prevent multiple submissions
      if (loading) return;

      try {
        setLoading(true);

        const { error } = await addToCart(user.id, product.id);

        if (error) {
          throw error;
        }

        setCart((prevCart) => [...prevCart, { products: product }]);

        message.success("Added to cart successfully!");
      } catch (error) {
        message.error(error.message || "Failed to add to cart");
      } finally {
        setLoading(false);
      }
    },
    [user, product, loading, setCart]
  );

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card
      className="product-card"
      hoverable
      cover={
        <div className="product-card-cover" onClick={handleProductClick}>
          <img
            alt={product.name}
            src={
              imageError ? "https://via.placeholder.com/250" : product.image_url
            }
            className="product-card-image"
            onError={handleImageError}
          />
        </div>
      }
      actions={[
        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          onClick={handleAddToCart}
          loading={loading}
          className="add-to-cart-btn"
        >
          Add to Cart
        </Button>,
      ]}
    >
      <Meta
        title={product.name}
        description={
          <>
            <Text strong className="product-price">
              ₹{product.price}
            </Text>
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 5 }}
            >
              <Rate disabled defaultValue={4} />
              <Text className="ml-2 text-gray-500">
                ({Math.floor(Math.random() * 500 + 100)})
              </Text>
            </div>
          </>
        }
        onClick={handleProductClick}
      />
    </Card>
  );
};

export default React.memo(ProductCard);
