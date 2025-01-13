import React from 'react';
import { Layout, Carousel, Typography } from 'antd';
import ProductList from '../components/Product/ProductList';


const { Content } = Layout;
const { Title } = Typography;

const Home = () => {
  const carouselItems = [
    {
      image: 'https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/98400de00ddb16fd.jpg?q=20',
      title: 'Big Sale!',
    },
    {
      image: 'https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/c4a4c37d9fa12546.jpg?q=20',
      title: 'New Arrivals',
    },
    {
      image: 'https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/b1c0f73e61ccfaf5.jpg?q=20',
      title: 'New Arrivals',
    },
    // Add more carousel items as needed
  ];

  const styles = {
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '16px',
    },
    carouselImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '8px',
    },
    section: {
      marginTop: '32px',
    },
  };
  console.log("Home...")

  return (
    <Content style={styles.content}>
      <Carousel autoplay>
        {carouselItems.map((item, index) => (
          <div key={index}>
            <img
              src={item.image}
              alt={item.title}
              style={styles.carouselImage}
            />
          </div>
        ))}
      </Carousel>

      <div style={styles.section}>
        <Title level={2}>Featured Products</Title>
        <ProductList />
      </div>
    </Content>
  );
};

export default Home;
