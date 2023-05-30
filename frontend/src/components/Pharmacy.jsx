import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const API_URL = "http://44.216.18.228:3001/patient/getPharmacy/";

export default function Pharmacy() {
  const [medicines, setMedicines] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [medCode, setMedCode] = useState("");

  const [location, setLocation] = useState(null);

  const tableRef = useRef(null);

  const handleExportClick = () => {
    const input = tableRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("table.pdf");
    });
  };

  const handleRemoveMedicine = (id) => {
    const updatedMedicines = medicines.filter((med) => med.name !== id);
    setMedicines(updatedMedicines)

  };

  const fetchMedicines = async () => {
    const response = await fetch(`${API_URL}${medCode}`);
    const data = await response.json();

    var resString = data[0].MEDICINE;

    // Split the string using comma as delimiter
    const arr = resString.split(",");

    // Loop through the array and create sub-arrays of name-price pairs
    const result = [];
    for (let i = 0; i < arr.length; i += 2) {
      result.push({ name: arr[i], price: parseFloat(arr[i + 1]) });
    }

    setMedicines(result);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (medCode) {
      fetchMedicines();
    } else {
      setMedicines([]);
    }
  }, [medCode]);

  useEffect(() => {
    const cost = medicines.reduce((total, med) => total + med.price, 0);
    setTotalCost(cost);
  }, [medicines]);

  const handleMedCodeChange = (event) => {
    setMedCode(event.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="med-code">Enter Medicine Code:</label>
            <input
              type="text"
              className="form-control"
              id="med-code"
              value={medCode}
              onChange={handleMedCodeChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2>Medicines:</h2>
          <table className="table" Style={"display: inline-table;"}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody ref={tableRef}>
              <tr Style={"height:50px"}>
                <td colSpan={2}></td>
              </tr>
              {medicines.map((med) => (
                <tr key={med.id}>
                  <td>{med.name}</td>
                  <td>{med.price}</td>
                  <td>
                    <button
                      onClick={() => handleRemoveMedicine(med.name)}
                      className="btn-danger"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}

              <tr>
                <td>
                  <h5>Total Cost: </h5>
                </td>
                <td>
                  <h4>{totalCost}</h4>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <table className="table" Style={"display: inline-table;"}>
            <tbody>
              <tr>
                <button
                  onClick={() => handleExportClick()}
                  className="btn btn-primary"
                  Style={"float:right; margin-bottom:50px"}
                >
                  Print Slip
                </button>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2>Pharmacies near you:</h2>

        {location ? (
          <p>
            {/* Your current location is: {location.latitude}, {location.longitude} */}
            <iframe
            title="geoLoc"
              src={`https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d13292.402321841455!2d${location.longitude}!3d${location.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sPharmacies!5e0!3m2!1sen!2s!4v1679580715558!5m2!1sen!2s`}
              width="1000"
              height="450"
              Style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
