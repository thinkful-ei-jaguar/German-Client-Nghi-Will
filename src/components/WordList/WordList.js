import React from "react";

import "./WordList.css";
import WordListItem from "../WordListItem/WordListItem";

export default function WordList(props) {
  const wordList = [...props.words];
  
 
  return (
    <div className="word_list">
      <h3>Words to practice</h3>
      <table id="word_table">
        <thead>
          <tr className="">
            <th></th>
            <th>Correct Answer Count</th>
            <th>Incorrect Answer Count</th>
          </tr>
        </thead>
        <tbody>
        {wordList.map((word, i) => (
              <WordListItem
                  key={i}
                  word={word}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}
