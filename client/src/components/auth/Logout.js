import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class LogOut extends Component {

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <div>
        <NavLink
          onClick={this.onLogoutClick} to="/logout"
        >
          <span className="nav-link">Log Out</span>
        </NavLink>
      </div>
    );
  }
}

LogOut.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(LogOut);
