import firebase, {database} from 'firebase';
import 'firebase/firestore'
import React from 'react';

var charMap = {}; 

export function LoadGrid() {
    const firebase = require('firebase');
    const db = firebase.firestore();
    var challengeGrid = [];
    var docGrid = db.collection('challenges').doc('grids');

    docGrid.get().then(function(doc) {
        if (!doc.exists) {
            console.log('No such document!');
          } else {
            console.log('Document data:', doc.data());
            charMap = doc.data();
          }
        })
        .catch(err => {
          console.log('Error getting document', err);
        });
    var allChallengeGrids = [];
    

  for (let challenge in charMap){
      let grid = charMap[challenge];
      if(grid.length >=  25) {
        const SIZE = 5;
        // for (let row = 0; row < SIZE; row++) {
        //   challengeGrid[row] = [];
        //   for (let col = 0; col < SIZE; ++col) {
        //     challengeGrid[row][col] = challengeGrid[SIZE * row + col];
        //     if (challengeGrid[row][col] === "Q") {challengeGrid[row][col] = "Qu";}
        //   }
        // }
        allChallengeGrids.push(challengeGrid);
        challengeGrid = [];
    }
}
      return allChallengeGrids;
    }

