import express from 'express';
import data from './data.js';

const app = express();
//test
app.get('/api/medicines', (req, res) => {
  res.send(data.medicines);
});

app.get('/api/medicines/slug/:slug', (req, res) => {
  const medicine = data.medicines.find(x=> x.slug ===req.params.slug);
  if(medicine) {
    res.send(medicine);
  } else {
    res.status(404).send({message: 'Medicine Not Found'})
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
