import React, { Component } from "react";
import "./priscriptionModal.css";

function generateRandomCode(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
  
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  }

class PrescriptionModal extends Component {


    constructor(props) {
        super(props);
        this.state = {
          user: JSON.parse(sessionStorage.getItem("user")),
          pat_id: this.props.pat.PATIENT_ID,
          prescription : [], 
          appointmentInfo: this.props.pat,
          medicines: []
        };
        this.handleSelectChange = this.handleSelectChange.bind(this);
      }
    
      handleSelectChange(event) {
        const pre = this.state.prescription;
        pre.push(event.target.value);
        this.setState({
          priscription: [this.state.priscription, pre]
        });
      }


  

       getMedicines = () => {
        fetch("http://localhost:3001/getInventory")
        .then((response) => response.json())
        .then((meds) => {
          if (meds === "NO" ) {
            this.setState({
              medicines : []
            });
          } else 
            this.setState({
              medicines : [meds]
            });


        })
        .catch((e) => console.log(e));
      }

      componentDidMount() { this.getMedicines() }

//   setPatEmail = (email) => {
//     this.setState({ Patient_email: email.target.value });
//   };

//   setPatName = (name) => {
//     this.setState({ Patient_Name: name.target.value });
//   };

//   setTime = (time) => {
//     this.setState({ AppTime: time.target.value });
//     // document.getElementById("confirmApp").disabled = false;
//   };



  sendPrescription = () => {

    let code =  generateRandomCode(10);
    let load = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        medicine: this.state.prescription.toString(),
        medCode: code,
      }),
    };
    console.log(load);
    fetch(`http://localhost:3001/doctor/addPrescription`, load)
      .then((res) => res.json())
      .then((res) => {
        if (res === "Added!") {


            const historyInfo = this.state.appointmentInfo;
            historyInfo.MED_CODE = code; // append a new key-value pair
            this.setState({
              appointmentInfo: [this.state.appointmentInfo, historyInfo]
            });

            this.props.handleTreated(this.state.appointmentInfo);
    
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
    
    var med = [];
    var array = this.state.medicines[0];


    const simpleArray = array ? array.map(({ name, price }) => [name, price]) : [];

med = simpleArray;

    return (
      <div id="bkMdlBgd">
        <div id="bkMdlCnt">
          <h2>Prescribe</h2>
         
          <div id="bkFrm">
     

            <div class="form-group">

{/* 
<h1>{this.state.pat_id}</h1>
<h1>{this.state.user.DOC_ID}</h1> */}


        {this.state.prescription.map((p , i)=> {

            return(
                <h5>{p}</h5>
            )
        } )}


              <label for="app_time">Date:</label>

              <select
                class="form-control"
                id="app_time"
                onChange={this.handleSelectChange}
              >
                <option value="SELECT">SELECT</option>
                {med.map((t, i) => {
                  return (
                    <option key={i} value={t} >
                      {t}
                    </option>
                  );
                })}
              </select>
            </div>

            <div id="btnGrp">
              <button
                className="btn btn-primary"
                id="confirmApp"
                
                onClick={this.sendPrescription}
              >
                Prescribe!
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

export default PrescriptionModal;
