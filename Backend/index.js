const express = require('express');
const cors = require('cors'); // Make sure to require 'cors' 
const db = require('./db'); 
const personRouter = require('./routes/personRouter');
const menuItemRouter = require('./routes/menuItemRouter');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173' 
}));
app.use(bodyParser.json());

app.use('/person', personRouter);
app.use('/menuItem', menuItemRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
