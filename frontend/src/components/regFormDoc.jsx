import React, { Component } from "react";
import "./signinForm.css";
//Input: name, password, specialization, regNo, location

class RegFormDoc extends Component {
  state = {
    name: "",
    password: "",
    email: "",
    number: "",
    specialization: "",
    regNo: "",
    location: "",
    fee: 0,
  };

  handleNameChange = (name) => {
    this.setState({ name: name.target.value });
  };
  handlePassChange = (pass) => {
    this.setState({ password: pass.target.value });
  };
  handleEmailChange = (email) => {
    this.setState({ email: email.target.value });
  };
  handleNumberChange = (number) => {
    this.setState({ number: number.target.value });
  };
  handleSplChange = (specialization) => {
    this.setState({ specialization: specialization.target.value });
  };
  handleRgNoChange = (regNo) => {
    this.setState({ regNo: regNo.target.value });
  };
  handleLocChange = (location) => {
    this.setState({ location: location.target.value });
  };

  handleFeeChange = (fee) => {
    this.setState({ fee: fee.target.value });
  };
  handleRegDoc = (event) => {
    event.preventDefault();
    // name, email, number, password, specialization, regNo, location
    let load = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        number: this.state.number,
        password: this.state.password,
        specialization: this.state.specialization,
        regNo: this.state.regNo,
        location: this.state.location,
        fee: this.state.fee,
      }),
    };
    // console.log(load);
    fetch("http://44.216.18.228:3001/registerDoc", load)
      .then((response) => response.json())
      .then((doc) => {
        if (doc.NAME === this.state.name) {
          alert(
            "Registered Successfully,\nOur Admin will verify your account soon.\nThank You!"
          );
        } else {
          alert(
            "Sorry, There was a problem,\nThis might be bacause of duplicate email!"
          );
        }
      })
      .catch((e) => console.log(e));
    document.getElementById("docRegForm").reset();
  };
  render() {
    return (
      <form id="docRegForm" onSubmit={this.handleRegDoc}>
        <div className="row">
        <div className="col-12 col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <div className="form-group">
              <label>Name* :</label>
               
              <input
                className="form-control"
                onChange={this.handleNameChange}
                id="docName"
                name="docName"
                type="text"
                placeholder="Enter name"
              />
               
            </div>
            <div className="form-group">
              <label>Password* :</label>
               
              <input
                className="form-control"
                onChange={this.handlePassChange}
                id="docPass"
                type="password"
                name="docPass"
                placeholder="New Pass"
              />
               
            </div>
            <div className="form-group">
              <label>Email(Will be used as username)* :</label>
               
              <input
                className="form-control"
                onChange={this.handleEmailChange}
                id="docEmail"
                type="email"
                name="docEmail"
                placeholder="example@gmail.com"
              />
               
            </div>
            <div className="form-group">
              <label>Phone Number* :</label>
               
              <input
                className="form-control"
                onChange={this.handleNumberChange}
                id="docNumber"
                type="number"
                name="docNumber"
                placeholder="Phone Number"
              />
               
            </div>
          </div>
          <div className="col-12 col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <div className="form-group">
              <label>Speccialization* :</label>
               
              <input
                className="form-control"
                onChange={this.handleSplChange}
                id="docSpl"
                name="docSpl"
                type="text"
                placeholder="Enter specialization"
              />
               
            </div>
            <div className="form-group">
          <label>Reg No.* :</label>
           
          <input
            className="form-control"
            onChange={this.handleRgNoChange}
            id="docRegNo"
            name="docRegNo"
            type="text"
            placeholder="Register No"
          />
           
        </div>
        <div className="form-group">
          <label>Location* :</label>
          <input
            className="form-control"
            onChange={this.handleLocChange}
            id="docLoc"
            name="docLoc"
            type="text"
            placeholder="Enter ur Locality"
          />
           
        </div>
        <div className="form-group">
          <label>Fee :</label>
          <input
            className="form-control"
            onChange={this.handleFeeChange}
            id="fee"
            name="fee"
            type="number"
            placeholder="Enter Your Fee"
          />
           
        </div>

          </div>
        </div>

        
        <div className="form-group">
          <button
            id="regDocSubmit"
            className="signinSubmit btn btn-primary"
            type="submit"
            // onClick={this.handleRegDoc}
          >
            Register
          </button>
        </div>
      </form>
    );
  }
}

export default RegFormDoc;
