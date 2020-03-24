import React, { Component } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import UserContext from "../../contexts/UserContext";

class LoginRoute extends Component {
  static contextType = UserContext;

  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/";
    history.push(destination);
  };

  componentDidMount() {
    this.context.updateActive("login");
  }

  render() {
    return (
      <section>
        <h2>Login</h2>
        <LoginForm onLoginSuccess={this.handleLoginSuccess} />
      </section>
    );
  }
}

export default LoginRoute;
