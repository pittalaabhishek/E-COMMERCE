import React from "react";
import { Layout, Row, Col, Empty } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState, userState } from "../store/atoms";
import CartItem from "../components/Cart/CartItem";
import CartSummary from "../components/Cart/CartSummary";
// import { getCartItems } from "../services/supabase";

const { Content } = Layout;

const Cart = () => {
  // const [loading, setLoading] = useState(true);
  const [cart, setCart] = useRecoilState(cartState);
  const user = useRecoilValue(userState);

  console.log("User state:", user);
  console.log("User ID:", user?.id);
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Empty description="Please login to view your cart" />
      </div>
    );
  }

  return (
    <Content className="max-w-7xl mx-auto p-4">
      <Row gutter={24}>
        <Col xs={24} lg={16}>
          {Array.isArray(cart) && cart.length > 0 ? (
            <>
              <p>Number of items in cart: {cart.length}</p>
              {cart.map((item) => {
                console.log("Rendering cart item:", item);
                return (
                  <CartItem
                    key={`${item.user_id}-${item.product_id}-${item.id}`}
                    item={item}
                  />
                );
              })}
            </>
          ) : (
            <Empty description="Your cart is empty" />
          )}
        </Col>
        <Col xs={24} lg={8}>
          <CartSummary />
        </Col>
      </Row>
    </Content>
  );
};

export default Cart;
