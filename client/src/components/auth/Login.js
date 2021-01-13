import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      logging: false,
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      console.log(nextProps.errors)
      this.setState({
        errors: nextProps.errors,
        logging: false
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.setState({
      logging: true
    })
    this.props.loginUser(userData)
  };

  render() {

    return (
      <div className="row m20">
        <div className="col s10 m8 no-padding col-centered">
          <Link to="/" className="btn-flat no-padding">
            <i className="material-icons left">keyboard_backspace</i>Back to
            home
          </Link>
          <h4>Log in below</h4>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="input-field col s12 no-padding">
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={this.state.errors.email}
                id="email"
                type="email"
                className={classnames("", {
                  invalid: this.state.errors.email,
                })}
              />
              <label htmlFor="email">Email</label>
              <span className="red-text">{this.state.errors.email}</span>
            </div>
            <div className="input-field col s12 no-padding">
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={this.state.errors.password}
                id="password"
                type="password"
                className={classnames("", {
                  invalid: this.state.errors.password,
                })}
              />
              <label htmlFor="password">Password</label>
              <span className="red-text">{this.state.errors.password}</span>
            </div>
            <div className="col s12 mb20 no-padding">
              <button
                type="submit"
                className="btn-large green-btn mb20"
              >
                Log In
              </button>
            </div>
            
            {this.state.logging && (
              <div>
                <div id="spinner" className="preloader-wrapper big active">
                  <div className="spinner-layer spinner-green-only">
                    <div className="circle-clipper left">
                      <div className="circle"></div>
                    </div><div className="gap-patch">
                      <div className="circle"></div>
                    </div><div className="circle-clipper right">
                      <div className="circle"></div>
                    </div>
                  </div>
                </div>
                <p>Logging in, please wait...</p>
              </div>
            )}


          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
