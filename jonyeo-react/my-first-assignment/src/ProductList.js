import React, { useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductList.css';

const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('./images/', false, /\.(png|jpe?g|svg)$/));

const productsData = [
  { id: 1, name: 'apple'      , image: images[0], quantity: 1 },
  { id: 2, name: 'avocado'    , image: images[1], quantity: 2 },
  { id: 3, name: 'banana'     , image: images[2], quantity: 3 },
  { id: 4, name: 'cherry'     , image: images[3], quantity: 4 },
  { id: 5, name: 'lemon'      , image: images[4], quantity: 5 },
  { id: 6, name: 'orange'     , image: images[5], quantity: 6 },
  { id: 7, name: 'peach'      , image: images[6], quantity: 7 },
  { id: 8, name: 'pineapple'  , image: images[7], quantity: 8 },
  { id: 9, name: 'watermelon' , image: images[8], quantity: 9 },
];

const ProductList = () => {
  const [products, setProducts] = useState(productsData);

  const handleAdd = (id) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, quantity: product.quantity + 1 } : product
      )
    );
  };

  const handleReduce = (id) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, quantity: Math.max(product.quantity - 1, 0) } : product
      )
    );
  };

  const handleReset = () => {
    setProducts(productsData);
  };

  const handleRemove = (id) => {
    setProducts(prevProducts =>
      prevProducts.filter(product => product.id !== id)
    );
  };

  return (
    <Container>
      <Button variant="outline-primary" onClick={handleReset}>Reset</Button>
      <Row>
        {products.map(product => (
          <Col className="custom-col" key={product.id}>
            <Card>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  Quantity: {product.quantity}
                </Card.Text>
                <Button variant="primary" onClick={() => handleAdd(product.id)}>Add</Button>{' '}
                <Button variant="secondary" onClick={() => handleReduce(product.id)}>Reduce</Button>{' '}
                {product.quantity === 0 &&
                  <Button variant="danger" onClick={() => handleRemove(product.id)}>Remove</Button>}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
