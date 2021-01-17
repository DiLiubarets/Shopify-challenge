import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import M from "materialize-css";
import "./Dashboard.css";
import ReactDOM from 'react-dom';



let ws = null;
let imageObjects = {}
let currentImageID = null
let editorLoaded = false


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      currentImage: null
    };
  }

  componentDidMount() {

    const { user } = this.props.auth;
    let context = this

    ws = new WebSocket(
      "ws://localhost:5000/?key=" + user.id
    );

    ws.onmessage = function (evt) {
      //let blob = new Blob ([evt.data])
      let imageObject = JSON.parse(evt.data)

      if(imageObject.edited) {
        context.renderEditor(imageObject.image)
      } else {
        imageObjects[imageObject.id] = imageObject
        let imageBlock = <div className="col s12 m4 l3"><a href=""><img onClick={context.selectImage} id={imageObject.id} className="device-img responsive-img" alt="images that you loaded" src={imageObject.image} /></a></div>
        var div = document.createElement('div')
        ReactDOM.render(imageBlock, document.getElementById("imageGrid").appendChild(div))
  
        if (!editorLoaded) {
          context.loadEditor(imageObject.id)
          editorLoaded = true
        }
      }
    }
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  uploadFile = (e) => {
    e.preventDefault();
    let name = this.fileInput.current.files[0].name
    console.log(`Selected file - ${this.fileInput.current.files[0].name}`)

    var reader = new FileReader();
    reader.readAsDataURL(this.fileInput.current.files[0]);
    reader.onloadend = function () {
      let base64data = reader.result;
      let imageObject = {
        name: name,
        image: base64data
      }
      ws.send(JSON.stringify(imageObject))
    }
  };

  selectImage = (e) => {
    e.preventDefault();
    let imageID = e.target.id
    this.loadEditor(imageID)
  };

  loadEditor(ID) {
    currentImageID = ID
    this.renderEditor(imageObjects[ID].image)
  }

  renderEditor(imageData) {
    this.setState({
      currentImage: imageData
    })
    let imageBlock = <div className="col s12 m4 l3"><img className="change-img responsive-img" alt="images that you loaded" src={imageData}/></div>
    ReactDOM.render(imageBlock, document.getElementById("editor"))
  }

 testEdit(type) {
   ws.send(JSON.stringify({imageID: this.state.currentImage, type: type}))
 }

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
                      You are logged into an{" "}
                    </span>
                    <span className="poppins-title">app</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m12">

            <div className="card-panel edit-card ">

            <div className="row " id="editor"></div>
            <button onClick={() => this.testEdit('resize')} className="green-btn btn-large" name="button"> resize</button>
            <button onClick={() => this.testEdit('grey')} className="green-btn btn-large" name="button"> grey</button>
            <button onClick={() => this.testEdit('tint')} className="green-btn btn-large" name="button"> tint</button>


            <a download="image.jpg" href={this.state.currentImage} ><button className="green-btn btn-large" name="button"> download</button></a>

           </div>
          </div>
        </div>
        <div className="row">
        <div className="row" id="imageGrid"></div>
        </div>
        <div className="row">
          <div className="col s12">

            <div className="card-panel dashboard-card">

              <form onSubmit={this.uploadFile}>
                <input type="file" ref={this.fileInput} />
                {/* <a href="#" className="green-btn btn-large" id="button" name="button" value="Upload" >Upload img</a> */}
                <button className="green-btn btn-large" name="button" value="Upload" type="submit" >Upload</button>
              </form>
            </div>
          </div>
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
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
