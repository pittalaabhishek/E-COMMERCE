import React from "react";
import { Layout, Row, Col, Empty } from "antd";
import { useRecoilValue } from "recoil";
import { cartState } from "../store/atoms";
import CartItem from "../components/Cart/CartItem";
import CartSummary from "../components/Cart/CartSummary";

const { Content } = Layout;

const Cart = () => {
  const cart = useRecoilValue(cartState);

  return (
    <Content className="max-w-7xl mx-auto p-4">
      <Row gutter={24}>
        <Col xs={24} lg={16}>
          {Array.isArray(cart) && cart.length > 0 ? (
            <>
              <p>Number of items in cart: {cart.length}</p>
              {cart.map((item) => {
                return (
                  <CartItem
                    key={`${item.user_id}-${item.product_id}-${item.id}`}
                    item={item}
                  />
                );
              })}
            </>
          ) : (
            <Empty description="Your cart is empty" style={{margin: "auto"}} />
          )}
        </Col>
        <Col xs={24} lg={8}>
          {cart.length>-1 && <CartSummary />}
        </Col>
      </Row>
    </Content>
  );
};

export default Cart;
