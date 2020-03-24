import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import UserContext from "../../contexts/UserContext";
import "./Header.css";

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

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
          className={this.context.active === "login" ? "active" : null}
        >
          Login
        </Link>
        <Link
          to="/register"
          className={this.context.active === "sign up" ? "active" : null}
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
