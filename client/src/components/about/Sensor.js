import React, { Component } from "react";
import ImgS from "../../images/Sensor.png";

class Sensor extends Component {
  render() {
    return (
      <div>
        <div className="col s12 l3 push-l7">
          <img
            alt="SunFounder Module Display"
            src={ImgS}
            className="device-img img-centered mb20"
          />
        </div>
        <div className="col s12 l5 pull-l3 center-align">
          <h3 className="mt20">Sensor</h3>
          <p>K30 CO₂ Carbon Dioxide Sensor</p>
          <a
            className="btn-large green-btn"
            href="https://www.ebay.com/itm/1pc-senseair-K30-CO2-Carbon-dioxide-sensor-F4641-CY/153411264694?hash=item23b80620b6:g:N6sAAOSwzRlaLfwf"
          >
            Buy on eBay
          </a>
        </div>
      </div>
    );
  }
}

export default Sensor;
