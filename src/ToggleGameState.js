import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import {GAME_STATE} from './game_state_enum.js';
import {CHALLENGE_STATE} from './challenge_state_enum.js';
import './ToggleGameState.css';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {LoadGrid} from './challenge_grid';

var ChallengeGrid =  LoadGrid();
export default function ToggleGameState({gameState, setGameState, challengeGame, setChallengeGame}) {

  const [buttonText, setButtonText] = useState("Start a new game!");

  function updateGameState(challengeMode, challengeGame) {

    if (challengeMode && (gameState === GAME_STATE.IN_PROGRESS) ) {
      //do nothing
    }
    else if (challengeMode && (gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED) ) {
      if(challengeGame === CHALLENGE_STATE.GAME_1){
        setChallengeGame(CHALLENGE_STATE.GAME_1);
        // setGrid(ChallengeGrid[0]);
      }
    else if(challengeGame === CHALLENGE_STATE.GAME_2){
        setChallengeGame(CHALLENGE_STATE.GAME_2);
      }
      setGameState(GAME_STATE.CHALLENGE_MODE);
      setButtonText("End game");
    }
    else if ( !(challengeMode) && (gameState === GAME_STATE.BEFORE )  ) {
      setGameState(GAME_STATE.IN_PROGRESS);
      setButtonText("End game");
    }
    else if ( !(challengeMode) && (gameState === GAME_STATE.CHALLENGE_MODE) ) {
        setGameState(GAME_STATE.ENDED);
      setButtonText("Start a new game!");
    }
    else if ( gameState === GAME_STATE.ENDED || gameState === GAME_STATE.IN_PROGRESS ) {
      setGameState(GAME_STATE.BEFORE);
      setButtonText("Start a new game!");
    }

  }

  function ChallengeMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
          Load Challenges
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          >
          <MenuItem onClick={() => updateGameState(true, CHALLENGE_STATE.GAME_1)} >Challenge 1</MenuItem>
          <MenuItem onClick={() => updateGameState(true, CHALLENGE_STATE.GAME_2)} >Challenge 2</MenuItem>
        </Menu>
      </div>
    );
  }

  return (
    <div className="Toggle-game-state">
    <Button onClick={() => updateGameState(false)} >
      {buttonText}
    </Button>
    <ChallengeMenu/>
  </div>
  );
}

