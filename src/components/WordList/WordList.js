import React, { Component } from "react";
import "./WordList.css";

class WordList extends Component {
  render() {
    return (
      <div className="word_list">
        <h3>Words to practice</h3>
        <table id="words">
          <tr className="">
            <th></th>
            <th>Correct Answer Count</th>
            <th>Incorrect Answer Count</th>
          </tr>
          <tr key="id+word">
            <td>SuperCali</td>
            <td>4</td>
            <td>4</td>
          </tr>
        </table>
      </div>
    );
  }
}

export default WordList;
