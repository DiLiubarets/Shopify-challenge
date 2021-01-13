import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import LogOut from "../../auth/Logout";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import M from "materialize-css/dist/js/materialize.min.js";

class Navbar extends Component {
  componentDidMount() {
    let sidenav = document.querySelector("#slide-out");
    M.Sidenav.init(sidenav, {});
  }

  render() {
    return (
      <nav className="navbar-style nav-extended">
        <div className="nav-wrapper">
          <NavLink
            to="/"
            style={{
              fontFamily: "monospace",
            }}
            className="brand-logo left"
          >
            <img
              src="https://raw.githubusercontent.com/DiLiubarets/MERN_CO2/ee0324595ed9d947d9114bce20ccd05dccd47908/client/src/components/layout/Navbar/assets/logo.svg"
              width="150"
              height="75"
              className="d-inline-block align-top m-4"
              alt="<MERN/> CO₂ Tracker logo"
            />
          </NavLink>
          <a
            href="/#"
            data-target="slide-out"
            className="sidenav-trigger right"
          >
            <i className="material-icons">menu</i>
          </a>

          <ul id="nav-mobile" className="right hide-on-med-and-down mr20">
            {this.props.auth.isAuthenticated && (
              <div>
                <li>
                  <NavLink to="/deviceInfo">Device Info</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to="/settings">Settings</NavLink>
                </li>
                <li>
                  <LogOut />
                </li>
              </div>
            )}

            {!this.props.auth.isAuthenticated && (
              <div>
                <li>
                  <NavLink to="/deviceInfo">Device Info</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Log In</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              </div>
            )}
          </ul>

          <ul id="slide-out" className="sidenav">
            {this.props.auth.isAuthenticated && (
              <div>
                <li>
                  <NavLink to="/deviceInfo">Device Info</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to="/settings">Settings</NavLink>
                </li>
                <li>
                  <LogOut />
                </li>
              </div>
            )}

            {!this.props.auth.isAuthenticated && (
              <div>
                <li>
                  <NavLink to="/deviceInfo">Device Info</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Log In</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              </div>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
