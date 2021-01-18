import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import Logo from "../../img/logo.jpeg"


class Landing extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 m10 l8 col-centered">
            <h1 className="center-align landing-header">
              Its all about images <i class="material-icons fingerprint"></i>
            </h1>
            <img
                  style={{ height: "100px" }}
                  src={Logo}
                  alt=""
                  className="img-centered"
                />
            <p className="m20 center-align">
              An image repository designed for summer 2021 - Shopify developer challenge question. 
              Tackled this challenge using a technology like React.js, Node.js, Javascript, WebSocket 
              and Sharp library. 
 </p>
            <br />
            <div className="two-buttons">
              <Link to="/login">
                <button className="btn-large edit-btn m-5">Log In</button>
              </Link>
              <Link to="/register">
                <button className="btn-large edit-btn m-5">Register</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
