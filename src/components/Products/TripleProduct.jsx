import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Image } from 'semantic-ui-react';
import Product from "./Product.jsx";

const TripleProduct = ({ chunk }) => (
  <Grid.Row>
    {
      chunk.map(product => (
        <Grid.Column key={product.productId}>
          <Product
            key={product.productId}
            productId={product.productId}
            productName={product.productName}
            productImage={product.productImage}
          />
        </Grid.Column>
      ))
    }
  </Grid.Row>
);

TripleProduct.propTypes = {
  chunk: PropTypes.array
};

export default TripleProduct;
