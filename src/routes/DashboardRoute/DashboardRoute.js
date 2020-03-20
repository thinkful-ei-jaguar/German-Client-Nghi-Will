import React, { Component } from "react";
import { Link } from "react-router-dom";
import DataService from "../../services/data-api-service";
import WordList from "../../components/WordList/WordList";
import "./DashboardRoute.css";
import UserContext from "../../contexts/UserContext";

class DashboardRoute extends Component {
  static contextType = UserContext;
  state = {
    words: [],
    lang: {}
  };

  componentDidMount() {
    DataService.getWords().then(data => {
      this.setState({ lang: data.language });
      this.setState({ words: data.words.sort((a, b) => a.id - b.id) });
    });
  }

  render() {
    const { lang = {}, words = [] } = this.state;
    return (
      <section>
        {lang.name && <h2>Let's Learn {lang.name}!</h2>}
        <Link to="/learn">
          <button className="start_lesson">Start practicing</button>
        </Link>
        <p>Total correct answers: {lang.total_score}</p>
        <WordList words={words} />
      </section>
    );
  }
}

export default DashboardRoute;
