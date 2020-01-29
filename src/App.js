import React, { useState, useEffect } from 'react';
import findAllSolutions from './solver.js';
import './App.css';

const BOARD = [['h', 'i', 's'],['s', 'h', 'e'],['t', 'e', 'a']];

function App() {

  const [allSolutions, setAllSolutions] = useState([]);

  // useEffect will trigger when the array items in the second argument are
  // updated. The array is empty, so this will run only when component is
  // initalized. We should only recompute all solutions if the board changes.
  useEffect(() => {
    const wordList = require('./full-wordlist.json');
    let tmpAllSolutions = findAllSolutions(BOARD, wordList.words);
    setAllSolutions(tmpAllSolutions);
  }, []);

  return (
    <div className="App">
      <ul>
        {allSolutions.map((solution) => {return <li>{solution}</li>})}
      </ul>
    </div>
  );
}

export default App;
