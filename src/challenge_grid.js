import firebase, {database} from 'firebase';
import 'firebase/firestore'
import firebaseApp from './firebase'
import React from 'react';

var charMap = {}; 

export function LoadGrid() {
    console.log("load grid working");
    const db = firebaseApp.firestore();
    var challengeGrid = [];
    var docRef = db.collection("challenges").doc("grids");
    docRef.get().then(function(doc) {
        if (doc.exists) {
            //console.log("Document data:", doc.data());
            charMap = doc.data();
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    var allChallengeGrids = [];

  for (let challenge in charMap){
        let grid = charMap[challenge];
        allChallengeGrids.push(challengeGrid);
        challengeGrid = [];
}
console.log(allChallengeGrids);
      return allChallengeGrids;
    }

