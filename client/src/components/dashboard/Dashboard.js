import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import M from "materialize-css";
import "./Dashboard.css";
import ReactDOM from 'react-dom';



let ws = null;
let imageObjects = {}
let editorLoaded = false
let currentImageID = null

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      currentImage: null,
      uploading: false,
      editorLoading: false
    };
  }

  //all images recieved here
  componentDidMount() {

    const { user } = this.props.auth;
    let context = this

    //create websocket
    ws = new WebSocket(
      "ws://localhost:5000/?key=" + user.id
    );

    //receive images one at a time
    ws.onmessage = function (evt) {
      let imageObject = JSON.parse(evt.data)

      //validate if edited, load high quality, or preview
      if (imageObject.edited || imageObject.hq) {
        currentImageID = imageObject.id
        context.renderEditor(imageObject.image)
      } else if (imageObject.deletedID) {
        context.deleteFileFromDOM(imageObject.deletedID)
      }
      else {
        imageObjects[imageObject.id] = imageObject
        let imageBlock = <div className="col s12 m4 l3"><a href=""><img onClick={context.selectImage} id={imageObject.id} className="device-img responsive-img" alt="images that you loaded" src={imageObject.image} /></a></div>
        var div = document.createElement('div')
        ReactDOM.render(imageBlock, document.getElementById("imageGrid").appendChild(div))

        if (imageObject.uploaded) {
          context.setState({
            uploading: false
          })
        }

        //load first image into editor
        if (!editorLoaded) {
          context.showSpinner()
          ws.send(JSON.stringify({ previewID: imageObject.id }))
          editorLoaded = true
        }
      }
    }
  }

  //validate file, convert to base64 and send to server
  uploadFile = (e) => {
    let context = this
    e.preventDefault();

    if (this.fileInput.current.files[0]) {
      let filesize = ((this.fileInput.current.files[0].size / 1024) / 1024).toFixed(4);
      if (filesize < 20) {
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
          context.setState({
            uploading: true
          })
          context.clearInputFile()
          ws.send(JSON.stringify(imageObject))
        }
      }
    }
  };

  deleteFile() {
    if (currentImageID) {
      ws.send(JSON.stringify({ deleteID: currentImageID }))
    }
  }

  deleteFileFromDOM(ID) {
    if (currentImageID) {
      delete imageObjects[ID]
      currentImageID = null
      this.setState({
        currentImage: null
      })
      let block = document.getElementById(ID)
      block.remove()
      ReactDOM.render("", document.getElementById("editor"))
    }
  }

  //send image id to server to load high quality version in editor
  selectImage = (e) => {
    e.preventDefault();
    let imageID = e.target.id
    this.showSpinner()
    ws.send(JSON.stringify({ previewID: imageID }))
  };

  //renders the editor with high quality version of image
  renderEditor(imageData) {
    this.setState({
      currentImage: imageData
    })
    let imageBlock = <div className="col s12 m4 l3"><img className="change-img responsive-img" alt="images that you loaded" src={imageData} /></div>
    ReactDOM.render(imageBlock, document.getElementById("editor"))
  }

  //sends image and edit parameter to server. Image is edited serverside and sent back to client for re-rendering into editor
  edit(type) {
    if (this.state.currentImage) {
      this.showSpinner()
      ws.send(JSON.stringify({ imageID: this.state.currentImage, type: type }))
    }
  }

  //display spinner in the editor for async edit and load operations 
  showSpinner() {
    let spinner = (<div>
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
    </div>)
    ReactDOM.render(spinner, document.getElementById("editor"))
  }

  //clears upload file input
  clearInputFile() {
    let f = document.getElementById("uploadInput")
    if (f.value) {
      try {
        f.value = ''; //for IE11, latest Chrome/Firefox/Opera...
      } catch (err) { }
      if (f.value) { //for IE5 ~ IE10
        var form = document.createElement('form'),
          parentNode = f.parentNode, ref = f.nextSibling;
        form.appendChild(f);
        form.reset();
        parentNode.insertBefore(f, ref);
      }
    }
  }

  //logout
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

              <div className="row " id="editor">
              </div>
              <button onClick={() => this.edit('resize')} className="green-btn btn-large" name="button"> resize</button>
              <button onClick={() => this.edit('grey')} className="green-btn btn-large" name="button"> grey</button>
              <button onClick={() => this.edit('tint')} className="green-btn btn-large" name="button"> tint</button>

              <a download="image.jpg" href={this.state.currentImage} ><button className="green-btn btn-large" name="button"> download</button></a>
              <button onClick={this.deleteFile} className="green-btn btn-large" name="button"> delete original</button>



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
                <input id="uploadInput" type="file" accept="image/*" ref={this.fileInput} />
                {/* <a href="#" className="green-btn btn-large" id="button" name="button" value="Upload" >Upload img</a> */}
                <button className="green-btn btn-large" name="button" value="Upload" type="submit" >Upload</button>


                {this.state.uploading && (
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
                  </div>
                )}

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
