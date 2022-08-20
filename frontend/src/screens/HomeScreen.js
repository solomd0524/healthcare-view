import { useEffect, useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Medicine from '../components/Medicine';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, medicines: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  //   const [medicines, setMedicines] = useState([]);

  const [{ loading, error, medicines }, dispatch] = useReducer(
    logger(reducer),
    {
      medicines: [],
      loading: true,
      error: '',
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/user/medicines');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
      //   setMedicines(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>CapStone Medicine</title>
      </Helmet>
      <h1>Featured Medicine</h1>
      <div className="medicines">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {medicines.map((medicine) => (
              <Col sm={6} md={4} lg={3} className="mb-3">
                <Medicine medicine={medicine}></Medicine>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
