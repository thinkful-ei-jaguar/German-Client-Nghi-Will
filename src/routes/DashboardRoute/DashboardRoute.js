import React, { Component } from "react";
import { Link } from "react-router-dom";
import DataService from "../../services/data-api-service";
import WordList from "../../components/WordList/WordList";
import "./DashboardRoute.css";

class DashboardRoute extends Component {
  state = { lang: "", words: [] };

  componentDidMount() {
    DataService.getWords().then(data =>
      this.setState({ lang: data.language.name, words: data.words })
    );
  }

  render() {
    console.log(this.state);
    return (
      <section>
        {this.state.lang && <h2>Let's Learn {this.state.lang}!</h2>}
        <Link to="/learn">
          <button className="start_lesson">Start practicing</button>
        </Link>
        <p>Total correct answers: 12</p>
        <WordList words={this.state.words} />
      </section>
    );
  }
}

export default DashboardRoute;
