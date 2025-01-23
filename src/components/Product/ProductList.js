import React, { useEffect } from "react";
import { Row, Col, Spin } from "antd";
import { useRecoilState } from "recoil";
import { productsState } from "../../store/atoms";
// import useFetch from "./useFetch";
import { getProducts } from "../../services/supabase";
import { useQuery } from "react-query";
import ProductCard from "./ProductCard";
const ProductList = ({ searchQuery, categories = [] }) => {
  const [products, setProducts] = useRecoilState(productsState);

  const applyFilters = (products) => {
    let filteredProducts = products;
    console.log("outside search query");
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      console.log("inside search query");
    }
    if (categories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        categories.includes(product.category_id)
      );
      console.log("inside category");
    }
    return filteredProducts;
  };

  const {
    data: fetchedProducts = {},
    isError,
    isLoading,
    error,
  } = useQuery("products", getProducts, {
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
    onError: (err) => {
      console.error("Error fetching products:", err);
    },
  });

  useEffect(() => {
    const productsArray = fetchedProducts?.data || [];
    if (productsArray.length > 0) {
      const filteredProducts = applyFilters(productsArray);
      setProducts(filteredProducts);
    }
    console.log("products", products);
  }, [fetchedProducts, searchQuery, categories, setProducts]);

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        Error: {error instanceof Error ? error.message : "An error occurred"}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }
  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>No products found.</p>
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
