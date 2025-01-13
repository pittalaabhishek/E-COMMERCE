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

  // useEffect(() => {
  //   console.log("before fetching cart details");
  //   const fetchCart = async () => {
  //     if (!user?.id) {
  //       console.log("No user ID available, skipping fetch");
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       console.log("Fetching cart for user ID:", user.id);
  //       const { data, error } = await getCartItems(user.id);
  //       if (error) {
  //         console.error("Error fetching cart:", error);
  //         throw error;
  //       }

  //       console.log("Cart data received:", data);
  //       if (data) {
  //         setCart(data);
  //         console.log("Filtered valid cart items:");
  //       } else {
  //         console.log("Invalid cart data structure:", data);
  //         setCart([]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching cart:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   if (user?.id) {
  //     fetchCart();
  //   }
  // }, [user, setCart]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Empty description="Please login to view your cart" />
      </div>
    );
  }

  return (
    // <Content className="max-w-7xl mx-auto p-4">
    //   <Row gutter={24}>
    //     <Col xs={24} lg={16}>
    //       {cart.map((item) => (
    //         <CartItem key={item.id} item={item} />
    //       ))}
    //       {cart.length === 0 && !loading && (
    //         <Empty description="Your cart is empty" />
    //       )}
    //     </Col>
    //     <Col xs={24} lg={8}>
    //       <CartSummary />
    //     </Col>
    //   </Row>
    // </Content>
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
                    key={`${item.user_id}-${item.product_id}`}
                    item={item}
                  />
                ); // Use product_id as the key
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
