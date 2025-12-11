import React, { useEffect, useState } from "react";
import axios from 'axios';
import './App.css';

function App(){
  const[userName , setUsername] = useState('')
  const[password , setPassword] = useState('')
  const[isLoggedIn , setisLoggedIn] = useState(false)
  const[food , setFood] = useState([])
  const[newFood , setNewFood] = useState('')
  const[newFoodName , setNewFoodName] = useState('')

  useEffect(() => {
    // if a token is stored, set logged-in state and fetch protected data
    const token = localStorage.getItem('token');
    if (token) {
      setisLoggedIn(true);
      fetchFood(token);
    }
  } , [])

  const fetchFood = async (token) => {
    try{
      // call the backend endpoint that returns foods (protected)
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get('http://localhost:3000/read', { headers });
      setFood(response.data || []);
    }
    catch (err) {
      console.error("Error fetching food:", err);
    }
  }

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username: userName,
        password: password
      });
      const { token } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        setisLoggedIn(true);
        await fetchFood(token);
      }
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      alert('Login failed: ' + (err.response?.data?.error || err.message));
    }
  }

  const handleLogOut = () => {
    localStorage.removeItem('token');
    setisLoggedIn(false);
    setFood([]);
  }

  return (
    <div className="App" style={{ padding: 20 }}>
      <h1>Food Items</h1>

      <form onSubmit={handleLogIn} style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <button type="submit">Log In</button>
        {isLoggedIn && (
          <button type="button" onClick={handleLogOut} style={{ marginLeft: 8 }}>
            Log Out
          </button>
        )}
      </form>

      {food.length === 0 ? (
        <p>No food items found.</p>
      ) : (
        <ul>
          {food.map((f) => (
            <li key={f._id || f.id}>
              <strong>{f.foodName || f.title}</strong>
              {f.price ? ` — $${f.price}` : ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App