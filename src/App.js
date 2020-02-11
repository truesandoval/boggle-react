import React, { useState, useEffect } from 'react';
import findAllSolutions from './solver.js';
import Board from './Board.js';
import GuessInput from './GuessInput.js';
import FoundSolutions from './FoundSolutions.js';
import ToggleGameState from './ToggleGameState.js';
import LoginButton from './LoginButton.js';
import UserResponses from './UserResponses';
import firebase, {database} from 'firebase';
import './App.css';
import {GAME_STATE} from './game_state_enum.js';
import {CHALLENGE_STATE} from './challenge_state_enum';
import {RandomGrid} from './random_grid.js';
import AllGrids from './challenge_grid';
// import {allHighestScores} from './Highscore.js';

function App() {
  // console.log(firebase.auth());
  const [user, setUser] = useState(null);
  const [allSolutions, setAllSolutions] = useState([]);
  const [foundSolutions, setFoundSolutions] = useState([]);
  const [gameState, setGameState] = useState(GAME_STATE.BEFORE);
  const [grid, setGrid] = useState([]);
  const [challengeGame, setChallengeGame] = useState(CHALLENGE_STATE.GAME_1);
  // const [highestScoreText, setHighestScoreText] = useState("");

  var ChallengeGrid =  AllGrids();
  // var Highscore =  allHighestScores();

  // admin.auth().getUser(uid)
  // .then(function(userRecord) {
  //   // See the UserRecord reference doc for the contents of userRecord.
  //   console.log('Successfully fetched user data:', userRecord.toJSON());

  // })
  // .catch(function(error) {
  //   console.log('Error fetching user data:', error);
  // });

  

  // useEffect will trigger when the array items in the second argument are
  // updated so whenever grid is updated, we will recompute the solutions
  useEffect(() => {
    const wordList = require('./full-wordlist.json');
    let tmpAllSolutions = findAllSolutions(grid, wordList.words);
    setAllSolutions(tmpAllSolutions);
  }, [grid]);

  // This will run when gameState changes.
  // When a new game is started, generate a new random grid and reset solutions
  useEffect(() => {
    if (gameState === GAME_STATE.IN_PROGRESS) {
      setGrid(RandomGrid());
      setFoundSolutions([]);
    }
    else if (gameState === GAME_STATE.CHALLENGE_MODE) {
      if(challengeGame === CHALLENGE_STATE.GAME_1){
        setGrid(ChallengeGrid[0]);
        // setHighestScoreText(Highscore[0]);
        // console.log(highestScoreText);
      }
      else if(challengeGame === CHALLENGE_STATE.GAME_2){
        setGrid(ChallengeGrid[1]);
        // setHighestScoreText(Highscore[1]);
      }
      setFoundSolutions([]);
    }
  }, [gameState, challengeGame]);

  function correctAnswerFound(answer) {
    console.log("New correct answer:" + answer);
    setFoundSolutions([...foundSolutions, answer]);
  }

  const firebase = require('firebase');
  const db = firebase.firestore();

  return (
    <div className="App">
      <header className="App-header">
      <LoginButton setUser={(user) => setUser(user)} />
      {user != null &&
	    <p>Welcome, {user.displayName} ({user.email})</p> 
        } 
       <ToggleGameState gameState={gameState}
                       setGameState={(state) => setGameState(state)}
                       challengeGame={challengeGame}
                       setChallengeGame={(challengeGame) => setChallengeGame(challengeGame)} />

      { gameState === GAME_STATE.IN_PROGRESS &&
        <div>
          <Board board={grid} />
          <GuessInput allSolutions={allSolutions}
                      foundSolutions={foundSolutions}
                      correctAnswerCallback={(answer) => correctAnswerFound(answer)}/>
          <FoundSolutions headerText="Solutions you've found" words={foundSolutions} user={user}/>
        </div>
      }
      { gameState === GAME_STATE.ENDED &&
        <div>
          <Board board={grid} />
          <FoundSolutions headerText="All possible solutions" words={allSolutions} />
        </div>
      }
      </header>
      
    </div>
  );
}

export default App;
