import React, { useState } from 'react';
import './App.css';

function App() {
  const [longURL, setLongURL] = useState('');
  const [shortURL, setShortURL] = useState('');

  const shortenUrl = async () => {
    const response = await fetch('http://localhost:5000/api/v2/shorten', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ longURL }),
    });

    if (response.ok) {
      const data = await response.json();
      setShortURL(data.shortURL);
      setLongURL("")
      // setShortURL(window.location.href + data.shortURL);
    }
  };

  return (
    <div className="App">
      <h1 className='text'>URL Shortener</h1>
      <input
        type="text"
        placeholder="Enter URL"
        className='input'
        value={longURL}
        onChange={(e) => setLongURL(e.target.value)}
      />
      <button className='btn' onClick={shortenUrl}>Shorten</button>
      {shortURL && (
        <div>
          <p>Shortened URL:</p>
          <a href={shortURL} target="_blank" rel="noopener noreferrer">
            {shortURL}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;

