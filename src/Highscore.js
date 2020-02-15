import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
 
function Highscore({users}) {
 
  const [dataList, setDataList] = useState([]);

  useEffect(
    () => {
      const unsubscribe = firebase.firestore().collection("users")
      .onSnapshot((querySnapshot) => {
          var firestoreData = [];
          querySnapshot.forEach(function(doc) {
            firestoreData.push({score: doc.data().score, id: doc.id});
          });
          setDataList(firestoreData);
        });
      return () => unsubscribe()
    },
    []
  )

  return (
    <div>
       <ul> 
        {dataList.map((data) => {
          return (<p key={data.id}>{data.score}</p>)
        })}
      </ul>
    </div>);
 };
 
export default Highscore;