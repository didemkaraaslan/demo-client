import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Grid, Header, Menu } from "semantic-ui-react";
import TripleProduct from "./TripleProduct.jsx";
import {
  EVENT_FETCH_ALL_PRODUCTS,
  EVENT_ADD_NEW_PRODUCT,
  EVENT_DELETE_PRODUCT
} from "../../utils/SocketEvents.js";
const io = require("socket.io-client");
const socket = io("http://localhost:3000");
var _ = require("lodash");

const ProductsList = ({ categories }) => {
  const [products, setProducts] = useState([]);
  const [activeMenuItem, setActiveMenuItem] = useState("Hepsi");

  const handleMenuItemSelect = (name, event) => {
    setActiveMenuItem(name);
  };

  const filterProductsByCategory = () => {
    if (activeMenuItem === "Hepsi") {
      const selectedCategoryNames = categories.map(
        category => category.categoryName
      );
      return products.filter(product =>
        selectedCategoryNames.includes(product.productCategoryName)
      );
    }

    return products.filter(
      product => product.productCategoryName === activeMenuItem
    );
  };

  // Effect for fetching all available products
  useEffect(() => {
    axios.get(`http://localhost:3000/api/products`).then(res => {
      socket.on(EVENT_FETCH_ALL_PRODUCTS, payload => {
        setProducts(payload);
      });
    });
  }, [categories]);

  // Effect for updating products when a new products added in realtime
  useEffect(() => {
    socket.on(EVENT_ADD_NEW_PRODUCT, payload => {
      console.log(payload);
      setProducts(prevProducts => [...prevProducts, payload]);
    });
  }, []);

  // Effect for updating products when a product deleted in realtime
  useEffect(() => {
    socket.on(EVENT_DELETE_PRODUCT, productIdToBeDeleted => {
      console.log(productIdToBeDeleted);
      setProducts(prevProducts =>
        prevProducts.filter(
          product => product.productId !== productIdToBeDeleted
        )
      );
    });
  }, []);

  const filteredProducts = filterProductsByCategory();

  return (
    <Grid>
      <Grid.Column width={3}>
        <Menu
          vertical
          inverted
          borderless
          fixed="left"
          style={{ minHeight: "100vh" }}
        >
          <Menu.Item header>Takip Edilenler</Menu.Item>
          <Menu.Item
            name="Hepsi"
            active={activeMenuItem === "Hepsi"}
            onClick={event => {
              handleMenuItemSelect("Hepsi", event);
            }}
          >
            Hepsi
          </Menu.Item>
          {categories.map(({ categoryId, categoryName }) => (
            <Menu.Item
              key={categoryId}
              name={categoryName}
              active={activeMenuItem === categoryName}
              onClick={event => {
                handleMenuItemSelect(categoryName, event);
              }}
            >
              {categoryName}
            </Menu.Item>
          ))}
        </Menu>
      </Grid.Column>

      <Grid.Column width={13}>
        <Header
          as="h3"
          textAlign="center"
          style={{ marginTop: 15, marginBottom: 25 }}
        >
          {" "}
          Ürünler{" "}
        </Header>
        <Grid columns={3} container>
          {_.chunk(filteredProducts, 3).map((chunk, key) => (
            <TripleProduct key={key} chunk={chunk} />
          ))}
        </Grid>
      </Grid.Column>
    </Grid>
  );
};

ProductsList.propTypes = {
  categories: PropTypes.array
};

export default ProductsList;
