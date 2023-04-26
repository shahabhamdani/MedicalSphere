import React, { Component } from "react";
import DataTablePatient from "./DataTablePatient";
import "./patientHomeTable.css";
import Pharmacy from "./Pharmacy";
import PatientFeedback from "./patientFeedback";



class PatHomeTable extends Component {
  
  
  state = {};
  render() {
    let tableHead, tableContent;
    var data = this.props.data;
   

    if (this.props.tableHead === "Available Doctors") {
      tableHead = "";
      tableContent = <div> <DataTablePatient data = {data} setAppDocInfo = {this.props.setAppDocInfo}/>
      </div>
    } 
    

    else if (this.props.tableHead === "Prescription") {
      tableHead = (
        <tr>
        <th>SL. NO.</th>
        <th>DOCTOR NAME</th>
        <th>PHONE NUMBER</th>
        <th>DATE</th>
        <th>TIME</th>
        <th>MEDICINE CODE</th>
      </tr>
      );
      tableContent = this.props.data.map((d, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{d.NAME}</td>
          <td>{d.PHONE_NUMBER}</td>
          <td>{d.DATE}</td>
          <td>{d.TIME}</td>
          <td>{d.MED_CODE}</td>
        </tr> ));
    } 

    else if (this.props.tableHead === "Pharmacy") {
      tableHead = ""
      tableContent = <div><Pharmacy/></div>
    } 

    
    else if (this.props.tableHead === "My Appointments") {
      tableHead = (
        <tr>
          <th>SL. NO.</th>
          <th>DOCTOR NAME</th>
          <th>SPECIALIZATION</th>
          <th>DATE</th>
          <th>TIME</th>
          <th>PHONE NUMBER</th>
        </tr>
      );
      tableContent = this.props.data.map((d, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{d.NAME}</td>
          <td>{d.SPECIALIZATION}</td>
          <td>{d.DATE}</td>
          <td>{d.TIME}</td>
          <td>{d.PHONE_NUMBER}</td>
        </tr>
      ));
    } else if (this.props.tableHead === "Give Feedback") {

      tableContent = (<PatientFeedback data ={this.props.data} patient={this.props.patient} handleDeleteFeedback={this.props.handleDeleteFeedback} feedbackList={this.props.feedbackList}  handleGiveFeedback={this.props.handleGiveFeedback} />)



      // tableHead = (
      //   <tr>
      //     <th>SL. NO.</th>
      //     <th>FEEDBACK</th>
      //   </tr>
      // );


      // tableContent = this.props.data.map((d, i) => (
      //   <tr key={i}>
      //     <td>{i + 1}</td>
      //     <td>
      //       <div className="feedbackCard confirm">
      //         {d.NAME.toUpperCase()} &nbsp;&nbsp;&nbsp;{" "}
      //         {d.SPECIALIZATION.toUpperCase()}
      //         <br />
      //         <textarea id="remark" rows="3"></textarea>
      //         <br />
      //         <div style={{ textAlign: "right" }}>
      //           <button
      //             style={{
      //               textAlign: "center",
      //               padding: "0.4em",
      //               width: "18ex",
      //             }}
      //             id={"feedback_" + d.DOC_ID}
      //             onClick={() => {
      //               let remark = document.getElementById("remark").value;
      //               this.props.handleGiveFeedback(i, d.DOC_ID, remark);
      //             }}
      //           >
      //             Submit Feedback
      //           </button>
      //         </div>
      //       </div>
      //     </td>
      //   </tr>
      // ));
    }
    return (
      <div>
        <body oncontextmenu="return false" class="snippet-body">
          <div class="container rounded mt-5 bg-white p-md-5">
            <div class="table-responsive">
               <table class="table">
                <tbody className="table-body" >
                {tableHead}
                {tableContent}
                </tbody>
              </table> 

            </div>
          </div>
        </body>
      </div>
    );
  }
}

export default PatHomeTable;
