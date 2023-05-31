import React, { Component } from "react";
import Taskbar from "./taskbar";
import PatHomeTable from "./patientHomeTable";
import ProfileDisplayModal from "./profileDispMdl";
import "./patientHome.css";

import BookModal from "./bookModal";

class PatientHome extends Component {

  state = {
    validDocList: [],
    appointments: [],
    tableData: [],
    feedBackDocList: [],
    prescriptions: [],
    dispBookMdl: false,
    appDocInfo: {},
    tableHeading: "Available Doctors",
    emptyListMsg: "",
    metrics: [],
    feedbackList: [],

  };

  
  handleGetFeedback(){
    let patient = this.props.patient;


    fetch(`http://44.216.18.228:3001/patient/getFeedback/${patient.PATIENT_ID}`)
    .then((res) => res.json())
    .then((res) => {
      if (res !== "NO")
        this.setState({
          feedbackList: res,
        });
    });
  
  }


  _isMounted = false;



  componentDidMount() {
    // fetch(
    //   `http://44.216.18.228:3001/getInventory/`
    // )
    //   .then((res) => res.json())
    //   .then((res) => { console.log(  res)});


    this.handleGetFeedback();

    let patient = this.props.patient;

    fetch(
      `http://44.216.18.228:3001/patient/getPatientMatrics/${patient.PATIENT_ID}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res !== "NO")
          this.setState({
            metrics: res,
          });
      });

    this._isMounted = true;


    fetch("http://44.216.18.228:3001/patient/getDoctor")
      .then((response) => response.json())
      .then((docs) => {
        if (docs === "NO" && this._isMounted) {
          this.setState({
            emptyListMsg: "We are sorry no valid doctor registered yet...",
            tableData: [],
          });
        } else if (this._isMounted)
          this.setState({
            validDocList: docs,
            tableData: docs,
            emptyListMsg: "",
          });
      })
      .catch((e) => console.log(e));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleFilteredDocs = (filteredDocList) => {
    this.setState({ tableData: filteredDocList });
  };

  setAppDocInfo = (doc) => {
    this.setState({ appDocInfo: doc, dispBookMdl: true });
  };

  hideModal = () => {
    this.setState({ dispBookMdl: false });
  };

  getValidDocs = (heading) => {
    this.setState({
      tableHeading: heading,
      tableData: this.state.validDocList,
      emptyListMsg: "",
    });
  };
  getAppointments = (heading) => {
    // console.log(this.state.appointments);
    if (this.state.appointments.length) {
      this.setState({
        tableHeading: heading,
        tableData: this.state.appointments,
        emptyListMsg: "",
      });
    } else {
      let patient = this.props.patient;
      fetch(
        `http://44.216.18.228:3001/patient/getAppointments/${patient.PATIENT_ID}`
      )
        .then((res) => res.json())
        .then((res) => {
          if (res === "NO" && this._isMounted) {
            this.setState({
              tableHeading: heading,
              emptyListMsg:
                "You have no appiontments or ur booking has been canceled since doc was busy",
              tableData: [],
            });
          } else if (this._isMounted)
            this.setState({
              tableHeading: heading,
              tableData: res,
              appointments: res,
              emptyListMsg: "",
            });
        });
    }
  };

  handlePharmacy = (heading) => {
    this.setState({
      tableHeading: heading,
      tableData: [],
      emptyListMsg: "",
    });

    if (this._isMounted) {
      this.setState({
        tableHeading: heading,

        emptyListMsg: "",
        tableData: [],
      });
    }
  };

  handleGetPrescription = (heading) => {
    if (this.state.prescriptions.length) {
      this.setState({
        tableHeading: heading,
        tableData: this.state.prescriptions,
        emptyListMsg: "",
      });
    } else {
      let patient = this.props.patient;
      fetch(
        `http://44.216.18.228:3001/patient/getPrescriptions/${patient.PATIENT_ID}`
      )
        .then((res) => res.json())
        .then((res) => {
          if (res === "NO" && this._isMounted) {
            this.setState({
              emptyListMsg: "No prescriptions right now",
              tableData: [],
            });
          } else if (this._isMounted)
            this.setState({
              tableHeading: heading,
              tableData: res,
              prescriptions: res,
              emptyListMsg: "No prescriptions",
            });
        });
    }
  };

  getFeedbackDocList = (heading) => {
    if (this.state.feedBackDocList.length) {
      this.setState({
        tableHeading: heading,
        tableData: this.state.feedBackDocList,
        emptyListMsg: "",
      });
    } else {
      let patient = this.props.patient;
      fetch(
        `http://44.216.18.228:3001/patient/getFeedBackDocList/${patient.PATIENT_ID}`
      )
        .then((res) => res.json())
        .then((res) => {
          if (res === "NO" && this._isMounted) {
            this.setState({
              tableHeading: heading,

              emptyListMsg:
                "You must be treated by a doctor in order to give feedback...",
              tableData: [],
            });
          } else if (this._isMounted)
            this.setState({
              tableHeading: heading,
              tableData: res,
              appointments: res,
              emptyListMsg: "",
              feedBackDocList:res
            });
        });
    }
  };


  handleDeleteFeedback = (doc_id, sl_no) => {
    const data = {
      doc_id: doc_id,
      sl_no: sl_no,
    };

    fetch("http://44.216.18.228:3001/patient/deleteFeedback", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response === "SUCCESSFUL") {
          this.handleGetFeedback()

          this.setState({
            feedBackDocList:[]
          });

          this.getFeedbackDocList("Give Feedback")
          
        }
      });
  }

  handleGiveFeedback = (i, d_id, r) => {
    // console.log("Feedback Sent :", r);
    let load = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doc_id: d_id,
        pat_id: this.props.patient.PATIENT_ID,
        remark: r,
      }),
    };
    fetch("http://44.216.18.228:3001/patient/giveFeedback", load)
      .then((res) => res.json())
      .then((res) => {
        if (res === "SUCCESSFUL") {
          let feedBackList = [...this.state.feedBackDocList];
    
          feedBackList.splice(i, 1);
          this.setState({
            feedBackDocList: feedBackList,
            tableData: feedBackList,
          });

          this.handleGetFeedback();


        }
      });
  };

  render() {

    let profileModal = null,
      bookModal = null;

    if (this.state.dispBookMdl) {
      bookModal = (
        <BookModal doc={this.state.appDocInfo} hideMdl={this.hideModal} />
      );
    } else {
      bookModal = null;
    }

    if (this.props.showProf) {
      profileModal = (
        <ProfileDisplayModal
          userInfo={this.props.patient}
          showProfile={this.props.showProfile}
        />
      );
    } else {
      profileModal = null;
    }

    return (
      <div>
        {sessionStorage.getItem("user") &&
        sessionStorage.getItem("userType") === "patient" ? (

          <div className="content">
            <div className="taskbarDiv">
              <Taskbar
                user={this.props.user}
                handleFilter={this.handleFilteredDocs}
                getAppointments={this.getAppointments}
                getValidDocs={this.getValidDocs}
                getFeedbackDocList={this.getFeedbackDocList}
                handleGetPrescription={this.handleGetPrescription}
                handlePharmacy={this.handlePharmacy}
              />
            </div>

            <div className="patient-dashboard">
              <div class="container">
                <div class="row">
                  <div class="col-md-3">
                    <div class="card-counter primary">
                      <i class="fa fa-code-fork"></i>
                      <span class="count-numbers">
                        {this.state.metrics.CONFIRMED_APPOINTMENTS}
                      </span>
                      <span class="count-name">Apointments</span>
                    </div>
                  </div>

                  <div class="col-md-3">
                    <div class="card-counter danger">
                      <i class="fa fa-ticket"></i>
                      <span class="count-numbers">
                        {" "}
                        {this.state.metrics.APPOINTMENTS}
                      </span>
                      <span class="count-name">Pending Appointments</span>
                    </div>
                  </div>

                  <div class="col-md-3">
                    <div class="card-counter success">
                      <i class="fa fa-database"></i>
                      <span class="count-numbers">
                        {" "}
                        {this.state.metrics.HISTORY}
                      </span>
                      <span class="count-name">Prescriptions</span>
                    </div>
                  </div>

                  <div class="col-md-3">
                    <div class="card-counter info">
                      <i class="fa fa-users"></i>
                      <span class="count-numbers">
                        {" "}
                        {this.state.validDocList.length}
                      </span>
                      <span class="count-name">Available Doctors</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="tableDiv">
                    <h1>{this.state.tableHeading}</h1>
                    <PatHomeTable
                      setAppDocInfo={this.setAppDocInfo}
                      data={this.state.tableData}
                      user={this.props.user}
                      tableHead={this.state.tableHeading}
                      handleGiveFeedback={this.handleGiveFeedback}
                      patient={this.props.patient}
                      feedbackList={this.state.feedbackList}
                      handleDeleteFeedback={this.handleDeleteFeedback}
                    />
                    <p>{this.state.emptyListMsg}</p>
                  </div>
                </div>
              </div>
            </div>

            {bookModal}
            {profileModal}
          </div>
        ) : (
          <p>
            Sorry this URL is restricted please log in with valid
            credientials...
          </p>
        )}
      </div>
    );
  }
}

export default PatientHome;
