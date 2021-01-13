import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import Demogif from "../../../images/demo.gif"

class Landing extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 m10 l8 col-centered">
            <h1 className="center-align landing-header">
              Get to know the CO₂ around you
            </h1>
            <p className="m20 center-align">
              Our application allows users to understand the quality of the air
              around them with scientific precision through the power of the
              IoT. See what CO₂ levels are right now, in the past, and compare
              your stored data over time to make informed decisions for your
              needs.
            </p>

            <img
              alt="Demo gif"
              src={Demogif}
              className="device-img img-centered"
            />

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
