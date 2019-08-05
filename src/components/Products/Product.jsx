import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Icon } from 'semantic-ui-react';

const deleteAction = (
    <Button icon>
      <Icon name='delete' />
    </Button>
);

const Product = ({ productId, productName, productImage }) => (
    <Card
      fluid
      image={productImage}
      header={productName}

      extra={deleteAction}
    />
);

Product.propTypes = {
  productId: PropTypes.number,
  productName: PropTypes.string,
  productImage: PropTypes.string
};

export default Product;
