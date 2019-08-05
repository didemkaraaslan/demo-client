import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { Button, Message, Header, Image, Modal, Form } from 'semantic-ui-react'
import { availableCategories } from "../../utils/Categories.js";

const CategoryPicker = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);

  console.log(selectedCategories)
  return(
    <Modal
      dimmer="blurring"
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      closeOnDimmerClick={false}
    >
      <Modal.Header>Size hangi içerikleri gösterelim?</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Kategoriler</Header>
          <Form>
            <Form.Group inline={false}>
              { availableCategories.map(({ categoryId, categoryName}) => (
                <Form.Checkbox
                  key={categoryId}
                  label={categoryName}
                  checked={selectedCategories.some(category => category.categoryId === categoryId)}
                  onClick={(event, { checked }) => {
                    if(checked) {
                      setSelectedCategories(prevSelectedCategories => [
                        ...prevSelectedCategories,
                        {
                          categoryId,
                          categoryName
                        }
                      ])
                    } else {
                      setSelectedCategories(prevSelectedCategories =>
                        prevSelectedCategories.filter(category => category.categoryId !== categoryId))
                    }
                  }}
                 />
              ))}
            </Form.Group>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        {
          selectedCategories.length <= 0 &&
          <span style={{ float: "left", color: "blue"}}>Devam etmek için en az bir kategori seçmelisiniz.</span>
        }
        <Button
          positive
          icon='checkmark'
          disabled={selectedCategories.length <= 0}
          labelPosition='right'
          content="İlerle"
          onClick={() => setModalOpen(false)}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default CategoryPicker;
