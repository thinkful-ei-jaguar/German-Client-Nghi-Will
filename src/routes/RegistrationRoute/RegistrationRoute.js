import React, { Component } from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import UserContext from "../../contexts/UserContext";
import "./RegistrationRoute.css";

class RegistrationRoute extends Component {
  static contextType = UserContext;

  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  componentDidMount() {
    this.context.updateActive("sign up");
  }

  handleRegistrationSuccess = () => {
    const { history } = this.props;
    history.push("/login");
  };

  render() {
    return (
      <section>
        <p className="description">
          Practice learning a language with the spaced repetition revision
          technique.
        </p>
        <h2>Sign up</h2>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    );
  }
}

export default RegistrationRoute;
