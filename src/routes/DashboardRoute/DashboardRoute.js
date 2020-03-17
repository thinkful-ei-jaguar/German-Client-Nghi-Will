import React, { Component } from "react";
import { Link } from "react-router-dom";
import DataService from "../../services/data-api-service";
import WordList from "../../components/WordList/WordList";
import "./DashboardRoute.css";

class DashboardRoute extends Component {
  state = {
    lang: {},
    words: []
  };

  componentDidMount() {
    DataService.getWords().then(data =>
      this.setState({ lang: data.language, words: data.words })
    );
  }

  render() {
    const { lang, words } = this.state;
    return (
      <section>
        {lang.name && <h2>Let's Learn {lang.name}!</h2>}
        <Link to="/learn">
          <button className="start_lesson">Start practicing</button>
        </Link>
        <p>Total correct answers:{lang.total_score}</p>
        <WordList words={words} />
      </section>
    );
  }
}

export default DashboardRoute;
