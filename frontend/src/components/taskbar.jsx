import React, { Component } from "react";
import "./taskbar.css";

class Taskbar extends Component {
  state = { DocLoc: "", DocSpl: "" };

  onDocLocChange = (name) => {
    this.setState({ DocLoc: name.target.value });
  };

  onDocSplChange = (name) => {
    this.setState({ DocSpl: name.target.value });
  };

  expandTaksbar = () => {
    document
      .getElementsByClassName("taskbar")[0]
      .classList.toggle("taskbarDisp");
    document.getElementById("1").classList.toggle("oneC");
    document.getElementById("2").classList.toggle("twoC");
    document.getElementById("3").classList.toggle("threeC");
  };



  handleBtn1Click = () => {
    if (this.props.user === "admin") {
      this.props.handleGetRegDocs("Registered Doctors");
    } else if (this.props.user === "patient") {
      this.props.getValidDocs("Available Doctors");
    } else if (this.props.user === "doctor") {
      this.props.getNewApp("New Appointments");
    }
  };
  handleBtn2Click = () => {
    if (this.props.user === "admin") {
      this.props.handleGetValidDocs("Valid Doctors");
    } else if (this.props.user === "patient") {
      this.props.getAppointments("My Appointments");
    } else if (this.props.user === "doctor") {
      this.props.getConfirmedApp("My Appointments");
    }
  };

  handleBtn3Click = () => {
    if (this.props.user === "admin") {
      // this.props.setTabHead("All Doctors");
      this.props.handleGetAllDocs("All Doctors");
    } else if (this.props.user === "patient") {
      // this.props.setTabHead("Give Feedback");
      this.props.getFeedbackDocList("Give Feedback");
    } else if (this.props.user === "doctor") {
      this.props.getFeedBack("My Feedback");
    }
  };



  handleGetHistory = () => {
    this.props.getHistory("History");
  };

  handleBlogs = () =>{
    this.props.handleBlogs("Blogs");
  }

  render() {
    let btn1,
      btn2,
      btn3,
      btn5 = null,
      btn4 = null,
      btn6 = null


    if (this.props.user === "patient") {
      btn1 = "Available Doctors";
      btn2 = "My Appointments";
      btn3 = "Give Feedback";
      btn4 = (
        <button id="prescrition" onClick={() => this.props.handleGetPrescription("Prescription")}>
          Prescription
        </button>
      );
      btn5 = (<button id="Pharmacy" onClick={() => this.props.handlePharmacy("Pharmacy")}>
      Pharmacy
    </button>);

    } 
    
    
    else if (this.props.user === "admin") {
      btn1 = "Registered Doctors";
      btn2 = "Valid Doctors";
      btn3 = "All Doctors";
      btn6 = (
      <button id="blogs" onClick={this.handleBlogs}>
          Blogs
        </button>);




    } else if (this.props.user === "doctor") {
      btn1 = "New Appointments";
      btn2 = "Accepted Appointments";
      btn3 = "Feedback";
      btn4 = (
        <button id="history" onClick={this.handleGetHistory}>
          History
        </button>
      );
    }

    return (
      <div className="taskBarDiv">
       
        <div className="hamburger" onClick={this.expandTaksbar}>
          <span id="1"></span>
          <span id="2"></span>
          <span id="3"></span>
        </div>



        <div className="taskbar taskbarDisp">
          <button id={btn1} onClick={this.handleBtn1Click}>
            {btn1}
          </button>
          <button id={btn2} onClick={this.handleBtn2Click}>
            {btn2}
          </button>
          <button id={btn3} onClick={this.handleBtn3Click}>
            {btn3}
          </button>          

          {btn4}
          {btn5}
          {btn6}

        </div>
      </div>
    );
  }
}

export default Taskbar;
