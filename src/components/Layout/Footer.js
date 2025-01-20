import React from 'react';
import { Layout, Row, Col, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import '../../styles/Footer.css';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from '@ant-design/icons';

const { Footer } = Layout;
const { Title, Text } = Typography;

const AppFooter = () => {
  return (
    <Footer className="footer-container">
      <div className="footer-content">
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} md={6}>
            <Title level={4} className="footer-title">About</Title>
            <Space direction="vertical">
              <a href='https://corporate.flipkart.net/corporate-home' className='footer-link'>About Us</a>
              <Link to="/careers" className="footer-link">Careers</Link>
              <Link to="/press" className="footer-link">Press</Link>
            </Space>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Title level={4} className="footer-title">Help</Title>
            <Space direction="vertical">
              <Link to="/payments" className="footer-link">Payments</Link>
              <Link to="/shipping" className="footer-link">Shipping</Link>
              <Link to="/faq" className="footer-link">FAQ</Link>
            </Space>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Title level={4} className="footer-title">Policy</Title>
            <Space direction="vertical">
              <Link to="/return-policy" className="footer-link">Return Policy</Link>
              <Link to="/terms" className="footer-link">Terms of Use</Link>
              <Link to="/privacy" className="footer-link">Privacy</Link>
            </Space>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Title level={4} className="footer-title">Social</Title>
            <Space size="large">
              <a href="https://www.facebook.com/flipkart/" className='footer-link'>
              <FacebookOutlined className="social-icon" />
              </a>
              <a href="https://x.com/Flipkart?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor&mx=2" className='footer-link'>
              <TwitterOutlined className="social-icon" />
              </a>
              <a href="https://www.instagram.com/flipkart/?hl=en" className='footer-link'>
                <InstagramOutlined className="social-icon" />
              </a>
              <a href="https://in.linkedin.com/company/flipkart" className='footer-link'>
              <LinkedinOutlined className="social-icon" />
              </a>
            </Space>
          </Col>
        </Row>
        
        <div className="footer-bottom">
          <Row justify="space-between" align="middle">
            <Col>
              <Text className="footer-text">
                © 2024 Flipkart Clone. All rights reserved.
              </Text>
            </Col>
            <Col>
              <Space split={<span className="footer-divider">|</span>}>
                <Link to="/terms" className="footer-link">Terms</Link>
                <Link to="/privacy" className="footer-link">Privacy</Link>
                <Link to="/sitemap" className="footer-link">Sitemap</Link>
              </Space>
            </Col>
          </Row>
        </div>
      </div>
    </Footer>
  );
};

export default AppFooter;
