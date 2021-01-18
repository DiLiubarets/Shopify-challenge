import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import LogOut from "../../auth/Logout";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import M from "materialize-css/dist/js/materialize.min.js";
import Logo from "../../img/logo.jpeg"

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
              src={Logo}
              width="150"
              height="75"
              className="d-inline-block align-top m-4 logo"
              alt="Home"
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
