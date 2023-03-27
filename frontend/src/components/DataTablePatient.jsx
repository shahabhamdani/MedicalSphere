import React, { useState } from "react";
import { Table } from "@material-ui/core";
import docavtar from "./photos/docavtar.webp"



export default function DataTablePatient( props) {
  const data = props.data;
  const setAppDocInfo = props.setAppDocInfo;

    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  let sortedData = [...data];
  if (sortConfig !== null) {
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  if (searchTerm !== "") {
    sortedData = sortedData.filter((item) =>
      item.SPECIALIZATION.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search by category"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="btn btn-primary ml-3" onClick={() => handleSort("FEE")}>
          Sort by fee
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Category</th>
            <th>Phone</th>
            <th>Fee</th>
            <th>Action</th>


          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id}>
              <td>
              <img
                src={docavtar}
                class="rounded-circle"
                alt=""
              />
              </td>
              <td>{item.NAME}</td>
              <td>{item.SPECIALIZATION}</td>
              <td>{item.PHONE_NUMBER}</td>
              <td>{item.FEE}</td>
              <span
                onClick={() => setAppDocInfo(item)}
                id={item.DOC_ID}
                className="fa fa-plus-circle btn"
              ></span>
              

            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
