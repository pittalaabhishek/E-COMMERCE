// import React, { useState } from "react";
// import {
//   Card,
//   Button,
//   Typography,
//   Rate,
//   Descriptions,
//   Image,
//   Tag,
//   Divider,
//   message,
// } from "antd";
// import { ShoppingCartOutlined, ThunderboltOutlined } from "@ant-design/icons";
// import { useRecoilValue, useSetRecoilState } from "recoil";
// import { userState, cartState } from "../../store/atoms";
// import { addToCart } from "../../services/supabase";

// const { Title, Text } = Typography;

// const ProductDetailComponent = ({ product }) => {
//   const [loading, setLoading] = useState(false);
//   const user = useRecoilValue(userState);
//   const setCart = useSetRecoilState(cartState);
//   console.log(product.image_url);

//   const handleAddToCart = async () => {
//     if (!user) {
//       message.error("Please login to add items to cart");
//       return;
//     }

//     setLoading(true);
//     try {
//       const { error } = await addToCart(user.id, product.id);
//       if (error) throw error;

//       setCart((prevCart) => [...prevCart, { ...product, id: product.id }]);
//       message.success("Added to cart successfully!");
//     } catch (error) {
//       message.error("Failed to add to cart");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <Card>
//         <div className="grid md:grid-cols-2 gap-8">
//           <div>
//             <Image
//               src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//               alt="Test Image"
//               style={{
//                 width: "100%",
//                 height: "auto",
//                 objectFit: "contain",
//               }}
//               onError={(e) => {
//                 console.error("Image failed to load", e);

//                 console.error("Image source:", e.target.src);
//               }}
//             />
//           </div>

//           <div className="md:w-1/2">
//             <Title level={2}>{product.name}</Title>
//             <Rate disabled defaultValue={4} />
//             <Text className="ml-2">
//               ({Math.floor(Math.random() * 500 + 100)} ratings)
//             </Text>

//             <Divider />

//             <Title level={3} type="danger">
//               ₹{product.price}
//             </Title>
//             <Tag color="green">In Stock: {product.stock}</Tag>

//             <Divider />

//             <Descriptions title="Product Details" column={1}>
//               <Descriptions.Item label="Category">
//                 {product.category_name}
//               </Descriptions.Item>
//               <Descriptions.Item label="Description">
//                 {product.description}
//               </Descriptions.Item>
//             </Descriptions>

//             <Divider />

//             <div className="flex gap-4">
//               <Button
//                 type="primary"
//                 size="large"
//                 icon={<ShoppingCartOutlined />}
//                 onClick={handleAddToCart}
//                 loading={loading}
//               >
//                 Add to Cart
//               </Button>
//               <Button size="large" icon={<ThunderboltOutlined />} danger>
//                 Buy Now
//               </Button>
//             </div>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default ProductDetailComponent;
import React, { useState } from "react";
import {
  Card,
  Button,
  Typography,
  Rate,
  Descriptions,
  Image,
  Tag,
  Divider,
  message,
} from "antd";
import { ShoppingCartOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState, cartState } from "../../store/atoms";
import { addToCart } from "../../services/supabase";
import "../../styles/ProductDetails.css";

const { Title, Text } = Typography;

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

      // setCart((prevCart) => [...prevCart, { ...product, id: product.id }]);
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
            <Button 
              icon={<ThunderboltOutlined />} 
              danger 
              className="buy-now-btn"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailComponent;