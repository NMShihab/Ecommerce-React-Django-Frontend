import React, { useEffect } from "react";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProductActions } from "../actions/productAction";
import { Row, Col } from "react-bootstrap";

const HomePage = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  // const { loading = loading, productsl = product } = productList;
  useEffect(() => {
    dispatch(listProductActions());
    console.log("dispatch");
  }, []);
  console.log(productList);
  console.log(typeof loading);

  const products = [];

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
