const Joi = require('joi');
const express = require('express');

const app = express();
app.use(express.json());
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
  if (!course) return res.status(404).send('The course does not exist.');
  res.send(course);
});

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  // validate if the course exits
  let course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course does not exist.');

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Create the course
  course.name = req.body.name;
  res.send(course);
});


app.delete('/api/courses/:id', (req, res) => {
  // validate if the course exits
  let course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course does not exist.');

  // Delete the course
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validateCourse(course) {
  // Validate the request body
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });
  return schema.validate(course);
}

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});