// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

// Component for deleting a person
const DeletePerson = ({ personId, onDeleteSuccess }) => {
  const [error, setError] = useState(null);

  const handleDelete = () => {
    axios.delete(`http://localhost:3000/person/${personId}`)
      .then(() => {
        onDeleteSuccess(personId);
      })
      .catch(error => {
        console.error('There was an error deleting the person!', error);
        setError('Failed to delete person');
      });
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

// Component for updating a person
const UpdatePerson = ({ person, onUpdateSuccess }) => {
  const [form, setForm] = useState({ ...person });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:3000/person/${person._id}`, form)
      .then(response => {
        onUpdateSuccess(response.data);
        alert('Person updated successfully');
      })
      .catch(error => {
        console.error('There was an error updating the person!', error);
        setError('Failed to update person');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="person-form">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="work"
        placeholder="Work"
        value={form.work}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="mobile"
        placeholder="Mobile"
        value={form.mobile}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="salary"
        placeholder="Salary"
        value={form.salary}
        onChange={handleInputChange}
      />
      <button type="submit">Update Person</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

// Component for adding a new person
const PostPerson = ({ onAddSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    work: '',
    mobile: '',
    email: '',
    address: '',
    salary: ''
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/person', form)
      .then(response => {
        onAddSuccess(response.data);
        alert('Person added successfully');
        setForm({
          name: '',
          age: '',
          work: '',
          mobile: '',
          email: '',
          address: '',
          salary: ''
        });
      })
      .catch(error => {
        console.error('There was an error posting the data!', error);
        setError('Failed to post data');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="person-form">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="work"
        placeholder="Work"
        value={form.work}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="mobile"
        placeholder="Mobile"
        value={form.mobile}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="salary"
        placeholder="Salary"
        value={form.salary}
        onChange={handleInputChange}
      />
      <button type="submit">Add Person</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

// Main App component
const App = () => {
  const [persons, setPersons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/person') // Ensure this is the correct URL
      .then(response => {
        if (Array.isArray(response.data)) {
          setPersons(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
          setPersons([]); // Clear data if it's not an array
        }
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
        setError('Failed to fetch data');
      });
  }, []);

  // Handle successful addition
  const handleAddSuccess = (newPerson) => {
    setPersons([...persons, newPerson]);
  };

  // Handle successful deletion
  const handleDeleteSuccess = (deletedId) => {
    setPersons(persons.filter(person => person._id !== deletedId));
  };

  // Handle successful update
  const handleUpdateSuccess = (updatedPerson) => {
    setPersons(persons.map(person => person._id === updatedPerson._id ? updatedPerson : person));
  };

  return (
    <div className="app">
      <h1>Person Management</h1>
      <PostPerson onAddSuccess={handleAddSuccess} />
      
      <div className="person-list">
        {error && <p className="error">{error}</p>}
        {Array.isArray(persons) && persons.length > 0 ? (
          persons.map(person => (
            <div key={person._id} className="person-card">
              <h2>{person.name}</h2>
              <p><strong>Age:</strong> {person.age}</p>
              <p><strong>Work:</strong> {person.work}</p>
              <p><strong>Mobile:</strong> {person.mobile}</p>
              <p><strong>Email:</strong> {person.email}</p>
              <p><strong>Address:</strong> {person.address}</p>
              <p><strong>Salary:</strong> ${person.salary}</p>
              <DeletePerson personId={person._id} onDeleteSuccess={handleDeleteSuccess} />
              <UpdatePerson person={person} onUpdateSuccess={handleUpdateSuccess} />
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default App;
