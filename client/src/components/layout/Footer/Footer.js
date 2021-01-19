import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  render() {
    const today = new Date();
    return (
      <div>
        <footer className="footer mt-auto py-3">
          <h6 className="mb20"style={{ fontSize: "10px" }}>
            <span className="footer-highlight">This app was created by</span>
          </h6>
          <div className="row">
            <div className="col col-centered">
              <a
                href="https://github.com/DiLiubarets"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="This is an external link (opens in a new tab)"
              >
                <img
                  src="https://avatars1.githubusercontent.com/u/63736103?s=400&u=c8531605094635ca3e5e142bb59759a2259fdad0&v=4"
                  alt="Avatar of Dina"
                  style={{ height: "100px", borderRadius: "50px 0 50px 50px", margin: "10px" }}
                  className="grow"
                ></img>
              </a>
             
            </div>
          </div>
          <div className="row">
            <div className="col col-centered">
              <p><b>Dina Liubarets </b></p>
              <p>
                <small> Copyright &copy; {today.getFullYear()} All Rights Reserved</small>
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
