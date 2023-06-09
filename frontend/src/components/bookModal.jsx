import React, { Component } from "react";
import "./bookModal.css";

class BookModal extends Component {
  
  state = {
    // user: JSON.parse(sessionStorage.getItem("user")),
    doc_id: this.props.doc.DOC_ID,
    Patient_email: JSON.parse(sessionStorage.getItem("user")).EMAIL,
    Patient_Name: JSON.parse(sessionStorage.getItem("user")).NAME,
    AppDate: "",
    AppTime: "",
    availTime: [],
    notAvailable: false,
  };

  setPatEmail = (email) => {
    this.setState({ Patient_email: email.target.value });
  };

  setPatName = (name) => {
    this.setState({ Patient_Name: name.target.value });
  };

  setTime = (time) => {
    this.setState({ AppTime: time.target.value });
    // document.getElementById("confirmApp").disabled = false;
  };

  chkAvailableTime = (d) => {
    document.getElementById("waitDiv").style.display = "block";
    this.setState({ AppDate: d.target.value });
    fetch(
      `http://44.216.18.228:3001/patient/avlTime?doc_id=${this.state.doc_id}&date=${d.target.value}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res === "NA") {
          this.setState.notAvailable = true;
          document.getElementById("confirmApp").disabled = true;
        } else
          this.setState({
            availTime: res,
            AppTime: document.getElementById("app_time").value,
          });
        // console.log(document.getElementById("app_time").value);
        document.getElementById("waitDiv").style.display = "none";
      });
  };

  bookAppointment = () => {
    let load = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doc_id: this.props.doc.DOC_ID,
        pat_id: JSON.parse(sessionStorage.getItem("user")).PATIENT_ID,
        pat_name: this.state.Patient_Name,
        date: this.state.AppDate,
        time: this.state.AppTime,
      }),
    };
    // console.log(load);
    fetch(`http://44.216.18.228:3001/patient/bookAppointment`, load)
      .then((res) => res.json())
      .then((res) => {
        if (res === "Booked!") {
          this.props.hideMdl();
          alert("You appointment has been booked successfully!\nThank you");
        } else {
          alert("Sorry, Somthing didn't work...");
        }
      });
  };

  render() {
    // let user = JSON.parse(sessionStorage.getItem("user"));
    // console.log(user);
    let notAvailable = null;
    if (this.state.notAvailable) {
      notAvailable = (
        <option value="notAvailable">No time slots on this day</option>
      );
    } else {
      notAvailable = null;
    }
    // console.log(JSON.parse(sessionStorage.getItem("user")));

    return (
      <div id="bkMdlBgd">
        <div id="bkMdlCnt">
          <h2>Book Appointment</h2>
          <div id="docInfo">
            Doctor Name: {this.props.doc.NAME}
            <br />
            Specialization: {this.props.doc.SPECIALIZATION}
          </div>
          <div id="bkFrm">
            <div class="form-group">
              <label for="pat_name">Name:</label>
              <input
                type="text"
                id="pat_name"
                onChange={this.setPatName}
                value={this.state.Patient_Name}
                class="form-control"
                placeholder="Enter Name"
              />
            </div>
            <div class="form-group">
              <label for="pat_email">Email:</label>
              <input
                type="email"
                class="form-control"
                id="pat_email"
                onChange={this.setPatEmail}
                value={this.state.Patient_email}
                placeholder="Email"
              />
            </div>
            <div class="form-group">
              <label for="app_date">Date:</label>
              <input
                type="date"
                class="form-control"
                id="app_date"
                onChange={this.chkAvailableTime}
              />
            </div>

            <div class="form-group">
              <label for="app_time">Time:</label>

              <select                 class="form-control"
 id="app_time" onChange={this.setTime}>
                <option value="SELECT">SELECT</option>
                {this.state.availTime.map((t, i) => {
                  return (
                    <option key={i} value={t}>
                      {t}
                    </option>
                  );
                })}
                {notAvailable}
              </select>
            </div>

            <div id="btnGrp">
              <button
                className="btn btn-primary"
                id="confirmApp"
                disabled={
                  this.state.Patient_Name === "" ||
                  this.state.Patient_email === "" ||
                  this.state.AppDate === "" ||
                  this.state.AppTime === "SELECT"
                }
                onClick={this.bookAppointment}
              >
                Confirm, Book Appointment!
              </button>
              <button
                className="btn btn-danger"
                id="cancel"
                onClick={this.props.hideMdl}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div id="waitDiv">
          Finding available time slots... Please wait...
          <div className="spinner"></div>
        </div>
      </div>
    );
  }
}

export default BookModal;
