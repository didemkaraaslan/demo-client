import React from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";
import Product from "./Product.jsx";

const TripleProduct = ({ chunk }) => (
  <Grid.Row>
    {chunk.map(
      ({
        productId,
        productName,
        productImage,
        productCategoryName,
        productPrice,
        productStockQuantity
      }) => (
        <Grid.Column key={productId}>
          <Product
            key={productId}
            productId={productId}
            productName={productName}
            productImage={productImage}
            productCategoryName={productCategoryName}
            productPrice={productPrice}
            productStockQuantity={productStockQuantity}
          />
        </Grid.Column>
      )
    )}
  </Grid.Row>
);

TripleProduct.propTypes = {
  chunk: PropTypes.array
};

export default TripleProduct;
