import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Image } from 'semantic-ui-react';
import TripleProduct from "./TripleProduct.jsx";
var _ = require('lodash');

const ProductsList = ({ products }) => {

  const tripleChunks = _.chunk(products, 3);

  return(
    <Grid columns={3} container>
      {
        tripleChunks.map((chunk, key) => (
          <TripleProduct key={key} chunk={chunk} />
        ))
      }
    </Grid>
  );
}

ProductsList.propTypes = {
  products: PropTypes.array
};

export default  ProductsList;
