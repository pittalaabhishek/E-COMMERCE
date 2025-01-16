import React, { useState } from "react";
import { 
  Layout, 
  Carousel, 
  Typography, 
  Button, 
  Popover, 
  Checkbox, 
  Space 
} from "antd";
import { 
  FilterOutlined, 
  CloseOutlined 
} from "@ant-design/icons";
import ProductList from "../components/Product/ProductList";
import '../styles/Home.css';

const { Content } = Layout;
const { Title, Text } = Typography;

const Home = ({ searchQuery }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const carouselItems = [
    {
      image: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/124de624a6d2d0cf.jpeg?q=20",
      title: "Big Sale!",
    },
    {
      image: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/2ee48b23a7140acb.jpeg?q=20",
      title: "New Arrivals",
    },
    {
      image: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/3af38ba93e94f6bc.jpeg?q=20",
      title: "New Arrivals",
    },
  ];

  const categories = [
    { id: '5f81208b-9281-4634-bc1d-0a07c021b7bc', name: 'Electronics' },
    { id: 'bc1e2b12-451c-4b1f-bc3a-7f3c9b4fdbe2', name: 'Clothing' },
    { id: '9a76dfee-0bbd-451b-bda4-3e23c8b4db4f', name: 'Books' }
  ];

  const CategoryButton = () => {
    const handleCategorySelect = (category) => {
      setSelectedCategories(prev => 
        prev.includes(category) 
          ? prev.filter(c => c !== category)
          : [...prev, category]
      );
    };

    const clearCategories = () => {
      setSelectedCategories([]);
    };

    const categoryContent = (
      <div className="category-popover-content">
        <div className="category-popover-header">
          <Text strong>Select Categories</Text>
          {selectedCategories.length > 0 && (
            <Button 
              type="text" 
              size="small" 
              icon={<CloseOutlined />} 
              onClick={clearCategories}
            >
              Clear
            </Button>
          )}
        </div>
        <div className="category-checkbox-group">
          {categories.map(category => (
            <div key={category.id} className="category-checkbox-item">
              <Checkbox
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategorySelect(category.id)}
              >
                {category.name}
              </Checkbox>
            </div>
          ))}
        </div>
        <div className="category-popover-footer">
          <Button type="primary" block>Apply</Button>
        </div>
      </div>
    );

    return (
      <Popover
        content={categoryContent}
        trigger="click"
        placement="bottom"
        overlayClassName="category-popover"
      >
        <Button icon={<FilterOutlined />}>
          Categories
          {selectedCategories.length > 0 && (
            <span className="category-count">
              {selectedCategories.length}
            </span>
          )}
        </Button>
      </Popover>
    );
  };

  return (
    <Content className='content'>
      <Carousel autoplay>
        {carouselItems.map((item, index) => (
          <div key={index}>
            <img
              src={item.image}
              alt={item.title}
              className='carouselImage'
            />
          </div>
        ))}
      </Carousel>

      <div className='filterSection'>
        <Space>
          <CategoryButton />
        </Space>
      </div>

      <div className='section'>
        <Title level={2}>Featured Products</Title>
        <ProductList 
          searchQuery={searchQuery} 
          categories={selectedCategories}
        />
      </div>
    </Content>
  );
};

export default Home;