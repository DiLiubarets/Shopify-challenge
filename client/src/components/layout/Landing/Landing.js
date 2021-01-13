import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

class Landing extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 m10 l8 col-centered">
            <h1 className="center-align landing-header">
              Shopify
              Developer Intern Challenge Question. An image repository.
            </h1>
            <p className="m20 center-align">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <br />
            <div className="two-buttons">
              <Link to="/login">
                <button className="btn-large green-btn m-5">Log In</button>
              </Link>
              <Link to="/register">
                <button className="btn-large green-btn m-5">Register</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
