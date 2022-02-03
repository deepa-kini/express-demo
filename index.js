// returns a function
const express = require('express');

//returns an object with useful methods
// like put(), get(), post(), delete()
const app = express();

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.get('/api/courses', (req, res) => {
  res.send([1, 2, 3]);
})

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});