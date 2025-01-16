import React, { useEffect } from "react";
import { Row, Col, Spin } from "antd";
import { useRecoilState } from "recoil";
import { productsState } from "../../store/atoms";
import { getProducts } from "../../services/supabase";
import ProductCard from "./ProductCard";
const ProductList = ({ searchQuery, categories = [] }) => {
  const [products, setProducts] = useRecoilState(productsState);

  console.log("products");
  useEffect(() => {
    const fetchProducts = async () => {
      console.log("before fetching");
      try {
        const { data, error } = await getProducts();
        console.log("inside supabase getProducts");
        if (error) throw error;
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [setProducts]);

  const filterProducts = () => {
    let filteredProducts = products;
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    if (categories.length > 0) {
      console.log("categories:", categories);
      filteredProducts = filteredProducts.filter((product) =>
        categories.includes(product.category_id)
      );
    }
    return filteredProducts;
  };

  const filteredProducts = filterProducts();

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
        {filteredProducts.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default ProductList;
