import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState(''); // Store user input text
  const [searchString, setSearchString] = useState(''); // Store string to search for
  const [replaceString, setReplaceString] = useState(''); // Store replacement string
  const [displayText, setDisplayText] = useState(''); // For displaying highlighted text

  // Handle input text change
  const handleTextChange = (e) => {
    setText(e.target.value);
    setDisplayText(e.target.value); // Sync the display text
  };

  // Handle replace functionality
  const handleReplace = () => {
    // Use regex for case-insensitive global replacement
    const newText = text.replaceAll(
      new RegExp(searchString, 'gi'),
      `<mark>${replaceString}</mark>`
    );
    setDisplayText(newText); // Set the highlighted text
  };

  useEffect(() => {
    setDisplayText(text); // Set initial display text as input text
  }, [text]);

  return (
    <div className="App">
      <h1>Real-Time Text Analysis and String Replacement with Highlight</h1>

      {/* Input Textarea */}
      <textarea
        rows="10"
        cols="80"
        value={text}
        onChange={handleTextChange}
        placeholder="Type your text here..."
      />
      
      {/* Display statistics */}
      <div className="statistics">
        <p>Unique Word Count: {new Set(text.toLowerCase().match(/\b\w+\b/g)).size}</p>
        <p>Character Count (Excluding Spaces & Punctuation): {text.replace(/[\s\W]/g, '').length}</p>
      </div>

      {/* Replacement fields and button */}
      <div className="replacement-container">
        <input
          type="text"
          placeholder="Search string"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
        <input
          type="text"
          placeholder="Replace with"
          value={replaceString}
          onChange={(e) => setReplaceString(e.target.value)}
        />
        <button onClick={handleReplace}>Replace & Highlight</button>
      </div>

      {/* Display area for the highlighted text */}
      <div
        className="display-area"
        dangerouslySetInnerHTML={{ __html: displayText }}
      ></div>
    </div>
  );
}

export default App;
