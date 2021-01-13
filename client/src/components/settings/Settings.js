import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, deleteUser } from "../../actions/authActions";
import classnames from "classnames";
import axios from "axios";

let context;
class Settings extends Component {
  constructor(props) {
    super(props);
    context = this;
    this.state = {
      password: "",
      errors: {},
      user: this.props.auth.user
    };
  }
  requestNewKey() {
    axios
      .post("/api/users/newKey", {
        apiKey: context.props.auth.user.apiKey,
      })
      .then(function(response) {
        context.props.auth.user.apiKey = response.data;
        context.setState({
          user: context.props.auth.user,
        });
        //user.apiKey = response.data
      })
      .catch(function(error) {
        console.log(error);
      });
  }
 

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      console.log("componentWillReceiveProps is working");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.user.userEmail,
      password: this.state.password,
    };
    console.log(userData);

    this.props.deleteUser(userData);
    this.props.logoutUser();
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="row m20">
          <div className="col s10 m8 no-padding col-centered">
            <h4>Account Settings</h4>
          </div>
        </div>
        <div className="row m20">
          <div className="col s10 m8 no-padding col-centered">
            <h6>API Credentials</h6>
            <p>Copy and Paste from Below</p>
            <input
              disabled
              value={this.state.user.apiKey}
              id="disabled"
              type="text"
              className="validate"
            />
            <button
              className="btn-large green-btn mb20"
              onClick={this.requestNewKey}
            >
              Request new API key
            </button>
          </div>
        </div>
        <div className="row m20">
          <div className="col s10 m8 no-padding col-centered">
            <h6>Account Management</h6>
            <p>Delete your account</p>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12 no-padding">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email,
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12 no-padding">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password,
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="col s12 mb20 no-padding">
                <button type="submit" className="btn-large green-btn mb20">
                  Delete Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  deleteUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteUser, logoutUser })(Settings);
