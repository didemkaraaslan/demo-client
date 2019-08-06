import React, { useState } from 'react';
import io from 'socket.io-client';
import { Header, Segment } from 'semantic-ui-react';
import ProductsList from './components/Products/ProductsList.jsx';
import CategoryPicker from "./components/Categories/CategoryPicker.jsx";

import './App.css';

const App = () => {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [categoryPickerOpen, setCategoryPickerOpen] = useState(true);

  const handleSelectedCategories = categories => {
    setCategoryPickerOpen(false);
    setSelectedCategories([...categories]);
  };

  return (
    <div className="App">
      {
          selectedCategories.length <= 0 &&
          <CategoryPicker
            modalOpen={categoryPickerOpen}
            onModalClose={handleSelectedCategories}
          />
      }
      <ProductsList categories={selectedCategories}/>
    </div>
  );
}

export default App;
