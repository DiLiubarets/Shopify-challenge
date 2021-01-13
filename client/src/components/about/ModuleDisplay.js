import React, { Component } from "react";
import ImgM from "../../images/ModuleDisplay.png";

class ModuleDisplay extends Component {
  render() {
    return (
      <div>
        <div className="col s12 l3 push-l7">
          <img
            alt="SunFounder Module Display"
            src={ImgM}
            className="device-img img-centered mb20"
          />
        </div>
        <div className="col s12 l5 pull-l3 center-align">
          <h3 className="mt20">Module Display</h3>
          <p>
            SunFounder IIC/I2C/TWI 1602 Serial LCD Module Display for R3 Mega
            2560.
          </p>
          <a
            className="btn-large green-btn"
            href="https://www.amazon.ca/gp/product/B019K5X53O/ref=ppx_yo_dt_b_asin_title_o01_s01?ie=UTF8&psc=1"
          >
            Buy on Amazon
          </a>
        </div>
      </div>
    );
  }
}

export default ModuleDisplay;
