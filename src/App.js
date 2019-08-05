import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import ProductsList from './components/Products/ProductsList.jsx';
import CategoryPicker from "./components/Categories/CategoryPicker.jsx";

import './App.css';

const myProducts = [
  {
    productId: 1,
    productName: "IPHONE X",
    productImage: "https://image5.sahibinden.com/photos/09/75/59/thmb_718097559s2t.jpg"
  },
  {
    productId: 2,
    productName: "IPHONE 2",
    productImage: "https://image5.sahibinden.com/photos/09/75/59/thmb_718097559s2t.jpg"
  },
  {
    productId: 3,
    productName: "IPHONE 3",
    productImage: "https://image5.sahibinden.com/photos/09/75/59/thmb_718097559s2t.jpg"
  },
  {
    productId: 4,
    productName: "IPHONE 4",
    productImage: "https://image5.sahibinden.com/photos/09/75/59/thmb_718097559s2t.jpg"
  },
  {
    productId: 5,
    productName: "IPHONE X",
    productImage: "https://image5.sahibinden.com/photos/09/75/59/thmb_718097559s2t.jpg"
  },
  {
    productId: 6,
    productName: "IPHONE 5",
    productImage: "https://image5.sahibinden.com/photos/09/75/59/thmb_718097559s2t.jpg"
  },
  {
    productId: 7,
    productName: "IPHONE X",
    productImage: "https://image5.sahibinden.com/photos/09/75/59/thmb_718097559s2t.jpg"
  },
  {
    productId: 8,
    productName: "IPHONE X",
    productImage: "https://image5.sahibinden.com/photos/09/75/59/thmb_718097559s2t.jpg"
  }
];

const App = () => {
  return (
    <div className="App">
      <CategoryPicker />
      { /*<Header as='h3' textAlign='center' style={{ marginTop: 15, marginBottom: 25 }}> PRODUCTS </Header>
    <ProductsList products={myProducts}/> */}
    </div>
  );
}

export default App;
