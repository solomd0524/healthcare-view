import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import MedicineScreen from './screens/MedicineScreen';

function App() {
  return (
    <BrowserRouter>
    <div>
      <header>
        <Link to="/">Medicine</Link>
      </header>
      <main>
        <Routes>
          <Route path="/medicine/:slug" element={<MedicineScreen /> } />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
       
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
