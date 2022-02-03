// returns a function
const express = require('express');

//returns an object with useful methods
// like put(), get(), post(), delete()
const app = express();
const port = process.env.PORT || 2000

const courses = [
  { id: 1, name: 'Course1' },
  { id: 2, name: 'Course2' },
  { id: 3, name: 'Course3' },
]

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The course does not exist.')
  res.send(course);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});