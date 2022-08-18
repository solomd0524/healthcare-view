import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Medicine(props) {
  const { medicine } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === medicine._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/medicines/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Medicine is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card key={medicine.slug}>
      <Link to={`/medicines/${medicine.slug}`}>
        <img
          src={medicine.image}
          className="card-img-top"
          alt={medicine.name}
        />
      </Link>
      <Card.Body>
        <Link to={`/medicines/${medicine.slug}`}>
          <Card.Title>{medicine.name}</Card.Title>
        </Link>
        <Card.Text>${medicine.price}</Card.Text>
        {medicine.countInStock===0 ? (
         <Button variant="light" disabled>
          Out of stock
          </Button> 
          ) : (
        <Button onClick={() => addToCartHandler(medicine)}>Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Medicine;
