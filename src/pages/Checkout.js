import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Form,
  Input,
  Select,
  Radio,
  Button,
  message,
  Steps,
  Divider,
} from "antd";
import {
  HomeOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useRecoilValue } from "recoil";
import { cartState, userState } from "../store/atoms";
import { createOrder } from "../services/supabase";
import { useNavigate } from "react-router-dom";
import "../styles/Checkout.css";
import OrderSummary from "../components/Order/OrderSummary";

const { Title, Text } = Typography;
const { Option } = Select;

const Checkout = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const cart = useRecoilValue(cartState);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  // Calculate Total
  const calculateTotal = () => {
    return cart.reduce(
      (sum, item) => sum + item.products?.price * (item?.quantity || 1),
      0
    );
  };

  //Form Submission
  const handleSubmit = async () => {
    if (!user) {
      message.error("Please login to place order");
      return;
    }
    setLoading(true);
    try {
      const orderPayload = {
        user_id: user.id,
        total_amount: calculateTotal(),
        products: cart.map((item) => ({
          product_id: item.products.id,
          price: item.products.price,
          quantity: item.quantity || 1,
        })),
      };

      const { error } = await createOrder(orderPayload);

      message.success("Order placed successfully!");
      setCurrentStep(2);

      setTimeout(() => {
        navigate("/orders");
      }, 2000);
    } catch (error) {
      message.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  // Render Cart Items
  const renderCartItems = () => {
    if (!cart || cart.length === 0) {
      return (
        <div className="empty-cart-message">
          <Text type="secondary">Your cart is empty</Text>
        </div>
      );
    }

    return cart.map((item, index) => (
      <div key={item.products?.id || index} className="cart-item">
        <img
          src={item.products?.image_url || "fallback-image.png"}
          alt={item.products?.name || "Product"}
          className="cart-item-image"
          onError={(e) => {
            e.target.src = "fallback-image.png";
          }}
        />

        <div className="cart-item-details">
          <Text strong>{item.products?.name || "Unknown Product"}</Text>

          <div className="cart-item-price-quantity">
            <Text>
              ₹{item.products?.price?.toFixed(2) || "0.00"}
              {item.quantity > 1 && ` x ${item.quantity}`}
            </Text>

            {item.quantity > 1 && (
              <Text strong>
                Total: ₹{(item.products?.price * item.quantity).toFixed(2)}
              </Text>
            )}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="checkout-container">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
          <Card>
            <Steps current={currentStep}>
              <Steps.Step title="Address" icon={<HomeOutlined />} />
              <Steps.Step title="Payment" icon={<CreditCardOutlined />} />
              <Steps.Step title="Confirmation" icon={<CheckCircleOutlined />} />
            </Steps>

            {currentStep === 0 && (
              <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Title level={4}>Shipping Address</Title>

                <Form.Item
                  name="fullName"
                  label="Full Name"
                  initialValue={user?.user_metadata?.name || "N/A"}
                  rules={[
                    { required: true, message: "Please enter your full name" },
                  ]}
                >
                  <Input placeholder="Enter Full Name" />
                </Form.Item>

                <Form.Item
                  name="mobile"
                  label="Mobile Number"
                  initialValue={user?.user_metadata?.phone || "N/A"}
                  rules={[{ required: true }]}
                >
                  <Input placeholder="10 digit mobile number" />
                </Form.Item>

                <Form.Item
                  name="address"
                  label="Address"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea
                    rows={3}
                    placeholder="Enter complete address"
                  />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="city"
                      label="City"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="City" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="state"
                      label="State"
                      rules={[{ required: true }]}
                    >
                      <Select placeholder="Select State">
                        {/* Add Indian states */}
                        <Option value="Maharashtra">Maharashtra</Option>
                        <Option value="Delhi">Delhi</Option>
                        <Option value="Uttar Pradesh">Uttar Pradesh</Option>
                        <Option value="West Bengal">West Bengal</Option>
                        <Option value="Karnataka">Karnataka</Option>
                        <Option value="Telangana">Telangana</Option>
                        {/* More states */}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Button type="primary" htmlType="submit">
                  Continue to Payment
                </Button>
              </Form>
            )}

            {currentStep === 1 && (
              <div>
                <Title level={4}>Payment Method</Title>
                <Radio.Group
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <Radio value="cod">Cash on Delivery</Radio>
                  <Radio value="debit">Debit Card</Radio>
                </Radio.Group>

                {paymentMethod === "debit" && (
                  <Form>{/* Debit Card Form Fields */}</Form>
                )}

                <Button onClick={() => setCurrentStep(2)}>Place Order</Button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="order-confirmation">
                <CheckCircleOutlined style={{ fontSize: 72, color: "green" }} />
                <Title level={3}>Order Placed Successfully!</Title>
                <Text>Your order will be delivered soon.</Text>
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card title="Order Summary">
            {renderCartItems()}
            <OrderSummary />
            <Divider />
            <div className="order-total"></div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;
