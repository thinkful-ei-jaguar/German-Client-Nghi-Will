import React, { Component } from "react";
import "./NotFoundRoute.css";
import cryImg from "../../img/cry-face.png";

class NotFoundRoute extends Component {
  render() {
    return (
      <section className="not_found_section">
        <h2>404 - Page not found</h2>
        <p>Try going back to your previous page.</p>
        <img src={cryImg} alt="crying emoji" />
      </section>
    );
  }
}

export default NotFoundRoute;
