import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import data from '../data';

function HomeScreen() {
    const [medicines, setMedicines] = useState([]);
    useEffect(() => {
        const fetchData= async () => {
            const result = await axios.get('/api/medicines');
            setMedicines(result.data);
        };
        fetchData();
    }, []);
 
 
    return (
    <div>
      <h1>Featured Medicines</h1>
      <div className="medicines">
        {medicines.map((medicine) => (
          <div className="medicine" key={medicine.slug}>
            <Link to={`/medicine/${medicine.slug}`}>
              <img src={medicine.image} alt={medicine.name} />
            </Link>
            <div className="medicine-info">
              <Link to={`/medicine/${medicine.slug}`}>
                <p>{medicine.name}</p>
              </Link>
              <p>
                <strong>${medicine.price}</strong>
              </p>
              <button>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
