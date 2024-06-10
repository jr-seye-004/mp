// server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Define the schema and model
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);

// Create and save a new person
const createAndSavePerson = () => {
  const person = new Person({
    name: 'John Doe',
    age: 25,
    favoriteFoods: ['Pizza', 'Burger']
  });

  person.save((err, data) => {
    if (err) return console.error(err);
    console.log('Person saved:', data);
  });
};

createAndSavePerson();

// Create multiple people
const createManyPeople = (arrayOfPeople) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    console.log('Multiple people created:', data);
  });
};

const people = [
  { name: 'Jane Doe', age: 22, favoriteFoods: ['Salad', 'Pasta'] },
  { name: 'Mary Smith', age: 28, favoriteFoods: ['Pizza', 'Fries'] },
  { name: 'Robert Johnson', age: 32, favoriteFoods: ['Steak', 'Burger'] }
];

createManyPeople(people);

// Find all people with a given name
const findPeopleByName = (personName) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return console.error(err);
    console.log('People found:', data);
  });
};

findPeopleByName('John Doe');

// Find one person by favorite food
const findOneByFood = (food) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    console.log('Person found:', data);
  });
};

findOneByFood('Pizza');

// Find a person by ID
const findPersonById = (personId) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    console.log('Person found by ID:', data);
  });
};

findPersonById('60d21b4667d0d8992e610c85'); // Replace with a valid ID from your DB

// Update a person's favorite foods by ID
const updatePersonById = (personId) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);

    person.favoriteFoods.push('hamburger');
    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      console.log('Person updated:', updatedPerson);
    });
  });
};

updatePersonById('60d21b4667d0d8992e610c85'); // Replace with a valid ID from your DB

// Update a person's age by name
const updatePersonAgeByName = (personName) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, updatedPerson) => {
      if (err) return console.error(err);
      console.log('Person age updated:', updatedPerson);
    }
  );
};

updatePersonAgeByName('John Doe');

// Remove a person by ID
const removePersonById = (personId) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return console.error(err);
    console.log('Person removed:', removedPerson);
  });
};

removePersonById('60d21b4667d0d8992e610c85'); // Replace with a valid ID from your DB

// Remove all people with a given name
const removePeopleByName = (personName) => {
  Person.remove({ name: personName }, (err, result) => {
    if (err) return console.error(err);
    console.log('People removed:', result);
  });
};

removePeopleByName('Mary');

// Query chain
const queryChain = () => {
  Person.find({ favoriteFoods: 'burritos' })
    .sort('name')
    .limit(2)
    .select('-age')
    .exec((err, data) => {
      if (err) return console.error(err);
      console.log('Query chain results:', data);
    });
};

queryChain();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});









