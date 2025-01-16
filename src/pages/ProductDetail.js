import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import { getProductById } from '../services/supabase';
import ProductDetailComponent from '../components/Product/ProductDetail';

const { Content } = Layout;

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await getProductById(id);
        if (error) throw error;
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Product not found</p>
      </div>
    );
  }
  console.log("Product Details:", product);

  return (
    <Content>
      <ProductDetailComponent product={product} />
    </Content>
  );
};

export default ProductDetailPage;