import express from 'express';
import data from './data.js';

const app = express();
//test
app.get('/api/medicines', (req, res) => {
  res.send(data.medicines);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
