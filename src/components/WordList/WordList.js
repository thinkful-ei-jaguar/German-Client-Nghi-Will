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
              <th></th>
              <th>Correct Answer Count</th>
              <th>Incorrect Answer Count</th>
            </tr>
          </thead>
          <tbody>
            <tr key="id+word">
              <td>Word1</td>
              <td>4</td>
              <td>5</td>
            </tr>
            <tr key="Id+word">
              <td>Word2</td>
              <td>4</td>
              <td>2</td>
            </tr>
            <tr key="Idd+word">
              <td>Word2</td>
              <td>6</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default WordList;
