import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Medicine(props) {
  const { medicine } = props;
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
        <Button>Add to cart</Button>
      </Card.Body>
    </Card>
  );
}

export default Medicine;
