import React, { useState, useEffect } from "react";
import { Card, Avatar, Button, Form, Input, message } from "antd";
import { UserOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import "../styles/MyProfile.css"; // Ensure this CSS file exists
import { handleSave } from "../services/supabase";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  // const navigate = useNavigate();
  // State variables to hold user details
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Load user details from localStorage on component mount
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("supabase.auth.token"));
    if (session && session.currentSession) {
      const user = session.currentSession.user;
      setUserDetails({
        name: user.user_metadata?.name || "",
        email: user.email,
        phone: user.user_metadata?.phone || "",
      });
    }
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = async () => {
    try {
      await handleSave(userDetails);
      message.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile.");
    }
  };

  return (
    <div className="my-profile-container">
      <h2>My Profile</h2>
      <Form layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item label="Name">
          <Input
            name="name"
            value={userDetails.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </Form.Item>

        <Form.Item label="Email">
          <Input name="email" value={userDetails.email} disabled />
        </Form.Item>

        <Form.Item label="Phone">
          <Input
            name="phone"
            value={userDetails.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MyProfile;
