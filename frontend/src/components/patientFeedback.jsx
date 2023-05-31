import { Container } from "@material-ui/core";
import React, { Component } from "react";

export default class patientFeedback extends Component {
  state = {
    // feedbackList: [],
    // data: [],
  };

  changeState(){
    this.componentDidMount();
  }

  
  // handleDeleteFeedback(doc_id, sl_no) {
  //   const data = {
  //     doc_id: doc_id,
  //     sl_no: sl_no,
  //   };

  //   fetch("http://44.216.18.228:3001/patient/deleteFeedback", {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       if (response === "SUCCESSFUL") {
  //         this.componentDidMount();
  //       }
  //     });
  // }

  componentDidMount() {
    let patient = this.props.patient;

    // fetch(`http://44.216.18.228:3001/patient/getFeedback/${patient.PATIENT_ID}`)
    //   .then((res) => res.json())
    //   .then((res) => {
    //     if (res !== "NO")
    //       this.setState({
    //         feedbackList: res,
    //       });
    //   });

    // fetch(
    //   `http://44.216.18.228:3001/patient/getFeedBackDocList/${patient.PATIENT_ID}`
    // )
    //   .then((res) => res.json())
    //   .then((res) => {
    //     this.setState({
    //       data: res,
    //     });
    //   });
  }

  render() {
    let tableHead, tableContent, feedbackTable;

    tableHead = (
      <tr>
        <th>SL. NO.</th>
        <th>Doctor</th>

        <th>FEEDBACK</th>
      </tr>
    );


if (this.props.data !=="NO") {
  tableContent = this.props.data.map((d, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>
        {" "}
        {d.NAME.toUpperCase()} &nbsp;&nbsp;&nbsp;{" "}
        {d.SPECIALIZATION.toUpperCase()}
      </td>
      <td>
        <div className="feedbackCard confirm">
          <textarea id="remark" rows="3"></textarea>
          <br />
          <div style={{ textAlign: "right" }}>
            <button
              style={{
                textAlign: "center",
                padding: "0.4em",
                width: "18ex",
              }}
              id={"feedback_" + d.DOC_ID}
              onClick={() => {
                let remark = document.getElementById("remark").value;
                this.props.handleGiveFeedback(i, d.DOC_ID, remark);

              }}
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </td>
    </tr>
  ));
} else {
  tableContent = <tr><td colSpan="3">No data available.</td></tr>;
}

    feedbackTable = (
      <div Style={"width: fit-content;"} >

<br />
<br />

      <h3>All Feedbacks</h3>
    

        <tr>
          <th>SL. NO.</th>
          <th>Doctor</th>
          <th>Remarks</th>
          <th>Action</th>
        </tr>

        {this.props.feedbackList.length > 0 &&
          this.props.feedbackList.map((f, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                {f.NAME} ({f.SPECIALIZATION})
              </td>
              <td>{f.REMARK}</td>
              <span>
                <button
                  className="btn-danger"
                  onClick={() => this.props.handleDeleteFeedback(f.DOC_ID, f.SL_NO)}
                >
                  Delete
                </button>
              </span>
            </tr>
          ))}
      </div>
    );

    return (
      <table >
        {tableHead}
        {tableContent}
        {feedbackTable}
      </table>
    );
  }
}
