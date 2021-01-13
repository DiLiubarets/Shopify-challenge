import React, { Component } from "react";
import "./DeviceInfo.css";

class DeviceInfo extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 m10 l8 col-centered">
            <h1 className="center-align">
              Info
            </h1>
            <p className="center-align">
            “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
            </p>
          </div>
        </div>
        <hr className="breaker" />
        <div className="row">
          <div className="col s12 m10 l8 col-centered">
            <div className="row">
            </div>
            <hr className="breaker" />
           
            <hr className="breaker" />
            
            <hr className="breaker" />
            
            <hr className="breaker" />
            <div className="row center-align">
            <div className="col s12 center-align">
              
            
              <hr className="breaker" />
            </div>
          </div>
          </div>

        </div>
      </div>
    );
  }
}

export default DeviceInfo;
