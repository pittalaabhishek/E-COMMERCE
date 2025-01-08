import React, { useEffect } from 'react';
import { Row, Col, Spin, Empty } from 'antd';
import { useRecoilState } from 'recoil';
import { productsState } from '../../store/atoms';
import { getProducts } from '../../services/supabase';
import ProductCard from './ProductCard';
const ProductList = () => {
    const [products, setProducts] = useRecoilState(productsState);
    useEffect(() => {
    const fetchProducts = async () => {
    try {
    const { data, error } = await getProducts();
    if (error) throw error;
    setProducts(data);
    } catch (error) {
    console.error('Error fetching products:', error);
    }
    };
    if (products.length === 0) {
    fetchProducts();
    }
    }, [products.length, setProducts]);
    if (!products.length) {
    return (
    <div className="flex justify-center items-center h-64">
    <Spin size="large" />
    </div>
    );
    }
    return (
    <div className="py-8">
    <Row gutter={[16, 16]}>
    {products.map((product) => (
    <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
    <ProductCard product={product} />
    </Col>
    ))}
    </Row>
    </div>
    );
};
export default ProductList;