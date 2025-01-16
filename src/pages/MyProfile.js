import React from "react";
import { Card, Typography } from "antd";
import "../styles/MyProfile.css"; // Create a simple CSS file for styling if needed
import { useRecoilValue } from 'recoil';
import { userState } from '../store/atoms'

const { Title, Text } = Typography;

const MyProfile = () => {
  const user = useRecoilValue(userState);
  
  return (
    <div className="profile-container">
      <Card
        title="My Profile"
        bordered={false}
        style={{ width: 400, margin: "20px auto" }}
      >
        <Title level={4}>Name:</Title>
        <Text>{user?.user_metadata?.name || "N/A"}</Text>

        <Title level={4} style={{ marginTop: "20px" }}>
          Email:
        </Title>
        <Text>{user?.email || "N/A"}</Text>

        <Title level={4} style={{ marginTop: "20px" }}>
          Phone:
        </Title>
        <Text>{user?.user_metadata?.phone || "N/A"}</Text>
      </Card>
    </div>
  );
};

export default MyProfile;
