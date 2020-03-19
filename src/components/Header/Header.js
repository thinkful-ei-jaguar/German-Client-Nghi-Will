import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import UserContext from "../../contexts/UserContext";
import "./Header.css";

class Header extends Component {
  static contextType = UserContext;

  state = {
    active: ""
  };

  setActive = e => {
    this.setState({ active: e.currentTarget.text });
  };

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  componentDidMount() {
    if (window.location.pathname === "/login") {
      this.setState({ active: "Login" });
    } else if (window.location.pathname === "/register") {
      this.setState({ active: "Sign up" });
    }
  }

  renderLogoutLink() {
    return (
      <div className="header_session">
        <span>{this.context.user.name}</span>
        <nav onClick={this.context.processLogout}>
          <Link to="/login">Logout</Link>
        </nav>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <nav>
        <Link
          to="/login"
          className={this.state.active === "Login" ? "active" : null}
          onClick={this.setActive}
        >
          Login
        </Link>
        <Link
          to="/register"
          className={this.state.active === "Sign up" ? "active" : null}
          onClick={this.setActive}
        >
          Sign up
        </Link>
      </nav>
    );
  }

  render() {
    return (
      <header>
        <h1>
          <Link to="/">Try-lingual</Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header;
