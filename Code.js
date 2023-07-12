const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Connecting to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Creating the Person schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: { type: [String] }
});

// Creating the Person model
const Person = mongoose.model('Person', personSchema);

// Creating and saving a record
app.get('/create-person', (req, res) => {
  const person = new Person({
    name: 'sami saafi',
    age: 21,
    favoriteFoods: ['Pizza', 'Burger']
  });

  person.save((err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    } else {
      res.send(data);
    }
  });
});

// Creating many records
app.post('/create-people', (req, res) => {
  const arrayOfPeople = [
    { name: 'Alice', age: 30, favoriteFoods: ['Sushi', 'Pasta'] },
    { name: 'Bob', age: 35, favoriteFoods: ['Burger', 'Ice Cream'] }
  ];

  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    } else {
      res.send(data);
    }
  });
});

// Finding all people with a given name
app.get('/people-by-name/:name', (req, res) => {
  const name = req.params.name;

  Person.find({ name }, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    } else {
      res.send(data);
    }
  });
});

// Finding a person with a certain food in their favorites
app.get('/person-by-food/:food', (req, res) => {
  const food = req.params.food;

  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    } else {
      res.send(data);
    }
  });
});

// Finding a person by _id
app.get('/person-by-id/:personId', (req, res) => {
  const personId = req.params.personId;

  Person.findById(personId, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    } else {
      res.send(data);
    }
  });
});

// Performing classic updates by running find, edit, then save
app.put('/edit-then-save/:personId', (req, res) => {
  const personId = req.params.personId;

  Person.findById(personId, (err, person) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    } else {
      person.favoriteFoods.push('Hamburger');
      person.save((err, data) => {
        if (err) {
          console.error(err);
          res.status(500).send('An error occurred');
        } else {
          res.send(data);
        }
      });
    }
  });
});

// Performing new updates on a document using findOneAndUpdate
app.patch('/update-person/:personName', (req, res) => {
  const personName = req.params.personName;

  Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true }, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    } else {
      res.send(data);
    }
  });
});

// Deleting one document by _id
app.delete('/remove-person/:personId', (req, res) => {
  const personId = req.params.personId;

  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    } else {
      res.send(data);
    }
  });
});

// Deleting many documents with name "Mary"
app.delete('/remove-people', (req, res) => {
  Person.remove({ name: 'Mary' }, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    } else {
      res.send(data);
    }
  });
});

// Chaining search query helpers
app.get('/query-chain', (req, res) => {
  Person.find({ favoriteFoods: 'Burritos' })
    .sort('name')
    .limit(2)
    .select('-age')
    .exec((err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred');
      } else {
        res.send(data);
      }
    });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
