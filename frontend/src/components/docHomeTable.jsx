import React, { Component } from "react";
import "./tableDoc.css";

class DocHomeTable extends Component {
  state = {};

  handlePrescription = (a, i) => {
    
    this.props.setAppPatInfo(a);

  };

  render() {
    let tableHead, tableContent;

    // console.log(this.props.tableData);
    if (this.props.tableHeading === "New Appointments") {
      tableHead = (
        <tr>
          <th>SL. NO.</th>
          <th>PATIENT NAME</th>
          <th>PHONE NUMBER</th>
          <th>DATE</th>
          <th>TIME</th>
          <th>CONFIRM</th>
          <th>CANCEL</th>
        </tr>
      );
      tableContent = this.props.tableData.map((a, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{a.PATIENT_NAME}</td>
          <td>{a.PHONE_NUMBER}</td>
          <td>{a.DATE}</td>
          <td>{a.TIME}</td>
          <td Style={"float:right"} className="btn btn-success m-3 p-1">
            <span
              onClick={() => this.props.handleConfirmApp(a, i)}
              id={a.DOC_ID}
            >
              Confirm
            </span>
          </td>
          <td style={{ textAlign: "center" }} className="cancel">
            <button
              onClick={() => this.props.handleCancelApp(a, i)}
              id={a.DOC_ID}
            >
              Cancel
            </button>
          </td>
        </tr>
      ));
    } else if (this.props.tableHeading === "My Appointments") {
      tableHead = (
        <tr>
          <th>SL. NO.</th>
          <th>PATIENT NAME</th>
          <th>PHONE NUMBER</th>
          <th>DATE</th>
          <th>TIME</th>
          <th>ACTION</th>
          <th>CANCEL</th>
        </tr>
      );
      tableContent = this.props.tableData.map((a, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{a.PATIENT_NAME}</td>
          <td>{a.PHONE_NUMBER}</td>
          <td>{a.DATE}</td>
          <td>{a.TIME}</td>
          <td style={{ textAlign: "center" }} className="confirm">
            <button
              className="btn btn-primary  p-1"
              onClick={() => this.handlePrescription(a, i)}
              id={a.DOC_ID}
            >
              Prescribe
            </button>
          </td>
          <td style={{ textAlign: "center" }} className="cancel">
            <button
              className="btn btn-danger p-1"
              onClick={() => this.props.handleDinCome(a, i)}
              id={a.DOC_ID}
            >
              Cancel
            </button>
          </td>
        </tr>
      ));
    } else if (this.props.tableHeading === "History") {
      tableHead = (
        <tr>
          <th>SL. NO.</th>
          <th>PATIENT NAME</th>
          <th>PHONE NUMBER</th>
          <th>DATE</th>
          <th>TIME</th>
        </tr>
      );
      tableContent = this.props.tableData.map((a, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{a.PATIENT_NAME}</td>
          <td>{a.PHONE_NUMBER}</td>
          <td>{a.DATE}</td>
          <td>{a.TIME}</td>
        </tr>
      ));
    } else if (this.props.tableHeading === "My Feedback") {
      tableHead = (
        <tr>
          <th>SL. NO.</th>
          <th>REMARKS</th>
        </tr>
      );
      tableContent = this.props.tableData.map((a, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td className="remarkCol">{a.REMARK}</td>
        </tr>
      ));
    }

    return (
      <div>
        <table>
          <tbody>
            {tableHead}
            {tableContent}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DocHomeTable;
