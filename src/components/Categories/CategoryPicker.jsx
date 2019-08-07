import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Button, Header, Modal, Form } from "semantic-ui-react";
import {
  EVENT_FETCH_ALL_CATEGORIES,
  EVENT_ADD_NEW_CATEGORY,
  EVENT_DELETE_CATEGORY
} from "../../utils/SocketEvents.js";
const io = require("socket.io-client");
const socket = io("http://localhost:3000");

const CategoryPicker = ({ modalOpen, onModalClose }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Effect for fetching all available categories
  useEffect(() => {
    axios.get(`http://localhost:3000/api/categories`).then(res => {
      socket.on(EVENT_FETCH_ALL_CATEGORIES, payload => {
        setCategories(payload);
      });
    });

    return () => {
      socket.close();
    };
  }, []);

  // Effect for updating categories when a new category added in realtime
  useEffect(() => {
    socket.on(EVENT_ADD_NEW_CATEGORY, payload => {
      console.log(payload);
      setCategories(prevCategories => [...prevCategories, payload]);
    });
  }, []);

  // Effect for updating categories when a  category deleted in realtime
  useEffect(() => {
    socket.on(EVENT_DELETE_CATEGORY, categoryIdToBeDeleted => {
      console.log(categoryIdToBeDeleted);
      setCategories(prevCategories =>
        prevCategories.filter(
          category => category.categoryId !== categoryIdToBeDeleted
        )
      );
    });
  }, []);

  return (
    <Modal
      dimmer="blurring"
      open={modalOpen}
      onClose={() => onModalClose(selectedCategories)}
      closeOnDimmerClick={false}
    >
      <Modal.Header>Size hangi içerikleri gösterelim?</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Kategoriler</Header>
          <Form>
            <Form.Group inline={false}>
              {categories.map(({ categoryId, categoryName }) => (
                <Form.Checkbox
                  key={categoryId}
                  label={categoryName}
                  checked={selectedCategories.some(
                    category => category.categoryId === categoryId
                  )}
                  onClick={(event, { checked }) => {
                    if (checked) {
                      setSelectedCategories(prevSelectedCategories => [
                        ...prevSelectedCategories,
                        {
                          categoryId,
                          categoryName
                        }
                      ]);
                    } else {
                      setSelectedCategories(prevSelectedCategories =>
                        prevSelectedCategories.filter(
                          category => category.categoryId !== categoryId
                        )
                      );
                    }
                  }}
                />
              ))}
            </Form.Group>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        {selectedCategories.length <= 0 && (
          <span style={{ float: "left", color: "blue" }}>
            Devam etmek için en az bir kategori seçmelisiniz.
          </span>
        )}
        <Button
          positive
          icon="checkmark"
          disabled={selectedCategories.length <= 0}
          labelPosition="right"
          content="İlerle"
          onClick={() => onModalClose(selectedCategories)}
        />
      </Modal.Actions>
    </Modal>
  );
};

CategoryPicker.propTypes = {
  modalOpen: PropTypes.bool,
  onModalClose: PropTypes.func
};

export default CategoryPicker;
