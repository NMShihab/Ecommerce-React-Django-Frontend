import React from "react";
import Rating from "./Rating";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = (props) => {
  return (
    <Card className="p-3 my-3 rounded">
      <Link to={`/product/${props.product._id}`}>
        <Card.Img src={`http://127.0.0.1:8000${props.product.image}`} />
      </Link>
      <Card.Body>
        <Link to={`/product/${props.product._id}`}>
          <Card.Title as="div">{props.product.name}</Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={props.product.rating}
              text={`${props.product.numberOfReviews}`}
              color={"#f8e825"}
            />
          </div>
        </Card.Text>
        <Card.Text as="h3">${props.product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
