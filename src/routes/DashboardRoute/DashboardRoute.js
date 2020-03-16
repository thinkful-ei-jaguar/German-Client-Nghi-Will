import React, { Component } from "react";
import { Link } from "react-router-dom";
import WordList from "../../components/WordList/WordList";
import "./DashboardRoute.css";

class DashboardRoute extends Component {
  render() {
    return (
      <section>
        <h2>Let's Learn German!</h2>
        <button className="start_lesson">
          <Link to="/learn">Start Practicing</Link>
        </button>
        <WordList />
      </section>
    );
  }
}

export default DashboardRoute;
