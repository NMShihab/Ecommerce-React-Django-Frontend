import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await axios.get("/api/products/");
      setProducts(data);
    }
    fetchProduct();
  }, []);
  return (
    <div>
      <h1>Latest Product</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomePage;
