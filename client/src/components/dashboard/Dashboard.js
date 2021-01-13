import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import M from "materialize-css";
import "./Dashboard.css";
import "react-circular-progressbar/dist/styles.css";





class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;



    return (
      <div>
        <div className="row m20 mb0">
          <div className="col s12 ml10">
            <div className="card horizontal transparent mb0">
              <div className="card-image mt20">
                <img
                  style={{ height: "100px" }}
                  src=""
                  alt=""
                />
              </div>
              <div className="card-stacked">
                <div className="card-content">
                  <h6 className="mb0">Hi, {user.name.split(" ")[0]}</h6>
                  <h1 className="mt0" style={{ fontSize: "34px" }}>
                    <span className="poppins-title">
                      You are logged into a{" "}
                    </span>
                     <span className="poppins-title">app</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mrl20"> </div>
        <div className="row mrl20">
          
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  currentLocation: state.location,
  weatherData: state.weather,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
