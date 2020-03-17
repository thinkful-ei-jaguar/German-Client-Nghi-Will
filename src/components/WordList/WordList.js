import React, { Component } from "react";

import "./WordList.css";

class WordList extends Component {
  // Use this.props.words
  render() {
    return (
      <div className="word_list">
        <h3>Words to practice</h3>
        <table id="word_table">
          <thead>
            <tr className="">
              <th>Word</th>
              <th>Correct Answer Count</th>
              <th>Incorrect Answer Count</th>
            </tr>
          </thead>
          <tbody>
            {this.props.words.map(word => (
              <tr key={word + "_" + word.id}>
                <td>{word.original}</td>
                <td>{word.correct_count}</td>
                <td>{word.incorrect_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default WordList;
