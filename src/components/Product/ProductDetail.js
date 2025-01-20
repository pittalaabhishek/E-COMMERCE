import React, { useState } from "react";
import {
  Button,
  Rate,
  Image,
  Tag,
  message,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState, cartState } from "../../store/atoms";
import { addToCart } from "../../services/supabase";
import "../../styles/ProductDetails.css";

const ProductDetailComponent = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const user = useRecoilValue(userState);
  const setCart = useSetRecoilState(cartState);


  const handleAddToCart = async () => {
    if (!user) {
      message.error("Please login to add items to cart");
      return;
    }

    setLoading(true);
    try {
      const { error } = await addToCart(user.id, product.id);
      if (error) throw error;

      setCart((prevCart) => [...prevCart, { products: product }]);
      message.success("Added to cart successfully!");
    } catch (error) {
      message.error("Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-wrapper">
        <div className="product-image-section">
          <div className="product-image-container">
            <Image
              src={product.image_url || "https://via.placeholder.com/400"}
              alt={product.name}
              className="product-image"
            />
          </div>
        </div>

        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          
          <div className="product-rating">
            <Rate disabled defaultValue={4} />
            <span className="rating-count">
              ({Math.floor(Math.random() * 500 + 100)} ratings)
            </span>
          </div>

          <div className="product-price-section">
            <h2 className="product-price">₹{product.price}</h2>
            <Tag color="green" className="stock-tag">
              In Stock: {product.stock}
            </Tag>
          </div>

          <div className="product-description">
            <h3>Product Details</h3>
            <p>Category: {product.category_name}</p>
            <p>{product.description}</p>
          </div>

          <div className="product-actions">
            <Button 
              type="primary" 
              icon={<ShoppingCartOutlined />} 
              onClick={handleAddToCart}
              loading={loading}
              className="add-to-cart-btn"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailComponent;