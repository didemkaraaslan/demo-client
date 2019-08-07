import React from "react";
import PropTypes from "prop-types";
import { Card, Icon } from "semantic-ui-react";

const Product = ({
  productId,
  productName,
  productImage,
  productCategoryName,
  productPrice,
  productStockQuantity
}) => (
  <Card
    fluid
    image={productImage}
    header={productName}
    meta={
      <div>
        <span> ({productStockQuantity}) </span>
        <p style={{ color: "#ff8c00", fontSize: "17px", fontWeight: "bold" }}>
          {" "}
          {productPrice} TL
        </p>
      </div>
    }
    extra={
      <div>
        <span style={{ float: "left" }}>
          <Icon name="hashtag" />
          {productCategoryName}
        </span>
        <a style={{ float: "right" }}>
          <Icon name="delete" />
        </a>
      </div>
    }
  />
);

Product.propTypes = {
  productId: PropTypes.number,
  productName: PropTypes.string,
  productImage: PropTypes.string,
  productCategoryName: PropTypes.string,
  productPrice: PropTypes.number,
  productStockQuantity: PropTypes.number
};

export default Product;
