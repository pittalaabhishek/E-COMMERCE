import React from "react";
import { Card, Button, InputNumber, Typography, Image } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useSetRecoilState } from "recoil";
import { cartState } from "../../store/atoms";
import { removeFromCart, updateCartQuantity } from "../../services/supabase";

const { Text, Title } = Typography;

const CartItem = ({ item }) => {
  const setCart = useSetRecoilState(cartState);

  const handleRemove = async () => {
    try {
      const { error } = await removeFromCart(item.id);
      if (error) throw error;

      setCart((prevCart) =>
        prevCart.filter((cartItem) => cartItem.id !== item.id)
      );
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleQuantityChange = async (newQuantity) => {
    // setCart((prevCart) =>
    //   prevCart.map((cartItem) =>
    //     cartItem.id === item.id
    //       ? { ...cartItem, quantity: newQuantity }
    //       : cartItem
    //   )
    // );
    try {
      await updateCartQuantity(item.id, newQuantity);

      // Update the cart state locally
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <Card className="mb-4">
      <div className="flex items-center">
        <Image
          src={item.products?.image_url}
          alt={item.products?.name || "Product"}
          width={100}
          className="object-contain"
        />

        <div className="flex-grow ml-4">
          <Title level={5}>{item.products.name}</Title>
          <Text type="secondary">
            {item.products?.categories?.name}
          </Text>
          <div className="mt-2">
            <Text strong>₹{item.products?.price || 0}</Text>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <InputNumber
            min={1}
            max={item.products?.stock}
            value={item.quantity || 1}
            onChange={(value) => handleQuantityChange(value)}
            className="w-20"
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={handleRemove}
          >
            Remove
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CartItem;
