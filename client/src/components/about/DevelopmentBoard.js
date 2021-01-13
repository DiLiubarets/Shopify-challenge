import React, { Component } from "react";
import ImgD from "../../images/DevelopmentBoard2.png";

class DevelopmentBoard extends Component {
  render() {
    return (
      <div>
        <div className="col s12 l3">
          <img
            alt="SunFounder Module Display"
            src={ImgD}
            className="device-img img-centered mb20"
          />
        </div>
        <div className="col s12 l5 push-l4 center-align">
          <h3 className="mt10">Development Board</h3>
          <p>
            Development Board WiFi WLAN Wireless Module for ESP8266 NodeMCU
            ESP-12E Compatible with Arduino.
          </p>
          <a
            className="btn-large green-btn"
            href="https://www.amazon.ca/gp/product/B07PR9T5R5/ref=ppx_yo_dt_b_asin_title_o02_s00?ie=UTF8&psc=1"
          >
            Buy on Amazon
          </a>
      </div>
      </div>
    );
  }
}

export default DevelopmentBoard;
