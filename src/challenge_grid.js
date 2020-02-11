import firebase, {database} from 'firebase';
import 'firebase/firestore'
import React from 'react';

export default function allGrids(){
    const firebase = require('firebase');
    const db = firebase.firestore();

    var charMap = {}; 
    var docGrid = db.collection('challenges').doc('grids');
    docGrid.get().then(function(doc) {
        if (!doc.exists) {
            console.log('No such document!');
          } else {
            console.log('Document data:', doc.data());
          }
        })
        .catch(err => {
          console.log('Error getting document', err);
        });
    var allGrids = [];
    var grid = [];

  for (let challenge in charMap){
      let grid = charMap[challenge];
        const SIZE = 5;
        for (let row = 0; row < SIZE; row++) {
          allGrids[row] = [];
          for (let col = 0; col < SIZE; ++col) {
            allGrids[row][col] = grid[SIZE * row + col];
            if (allGrids[row][col] === "Q") {allGrids[row][col] = "Qu";}
          }
        }
        allGrids.push(allGrids);
        grid = [];
    }
    console.log(allGrids);
      return allGrids;
    }

