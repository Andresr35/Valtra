import React, { useState } from "react";
import ShopifyRequest from "../api/ShopifyRequest";
import { CSVLink } from "react-csv";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/esm/Container";

const Fulfill = () => {
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [alert, setAlert] = useState(false);
  const [file, setFile] = useState();
  const [data, setData] = useState([]);
  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  //just the setup of the array
  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    csvHeader.push("Status");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
    for (const obj in array) {
      if (!array[obj][Object.keys(array[obj])[0]]) {
        array.splice(obj, 1);
      }
    }
    setData(array);
    sendData(array);
  };

  /**
   * function to do stuff when a csv gets imported...changes the text in the file input field
   * @param {String} e
   */
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };
      fileReader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...data));

  //this runs when the button is pressed.
  const sendData = (array) => {
    try {
      //array.pop();
      for (const obj in array) {
        array[obj]["Tracking"] = array[obj][Object.keys(array[obj])[1]];
        delete array[obj][Object.keys(array[obj])[1]];
        var value = array[obj]["Tracking"].replace(/(\r\n|\n|\r)/gm, "");
        array[obj]["Tracking"] = value;
      }
      setRunning(true);
      ShopifyRequest.put("/fulfill", {
        sent: "success",
        data: array,
      })
        .then((response) => {
          updateStatus(response.data, array);
          setDone(true);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
      setAlert(true);
    }
  };

  const updateStatus = (response, prevArray) => {
    for (const obj in prevArray) {
      for (const order in response.orders) {
        if (
          prevArray[obj].Name === response.orders[order].name.replace("#", "")
        ) {
          prevArray[obj].Status = response.orders[order].Status;
          break;
        }
      }
    }
    const newArray = [...prevArray];
    setData(newArray);
  };

  const headers = [
    { label: "Name", key: "Name" },
    { label: "Status", key: "Status" },
    { label: "Tracking", key: "Tracking" },
  ];

  const csvReport = {
    filename: "report.csv",
    headers: headers,
    data: data,
  };

  return (
    <div>
      <div>
        <h1 style={{ textAlign: "center" }}>Import CSV to Fulfill Orders</h1>
      </div>
      <div className="container">
        <div className="row">
          <form>
            <div className="col">
              <input
                type={"file"}
                className="form-control"
                id={"csvFileInput"}
                onChange={handleOnChange}
                accept={".csv"}
              />
            </div> 
          </form> 
          <Container>
          <div className="col">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={(e) => {
                handleOnSubmit(e);
              }}
            >
              Import CSV
            </button>
          </div> 
          </Container>
        </div>
        <div className="row"> 
        <Container>
          <div className="col">
            <CSVLink className="btn btn-primary" {...csvReport}>
              Export
            </CSVLink> 
          </div> 
          </Container>
        </div> 
      </div>
      {/* This is where the alert is for whether a csv is done or not */}

      <Alert
        show={running}
        variant="success"
        onClose={() => setRunning(false)}
        dismissible
      >
        Fufilling Orders...
        {/* <div className="d-flex justify-content-end">
          <Button onClick={() => setRunning(false)} variant="outline-success">
            Close me y'all!
          </Button>
        </div> */}
      </Alert>
      <Alert
        show={done}
        variant="primary"
        onClose={() => setDone(false)}
        dismissible
      >
        Finished!
        {/* <div className="d-flex justify-content-end">
          <Button onClick={() => setRunning(false)} variant="outline-success">
            Close me y'all!
          </Button>
        </div> */}
      </Alert>
      <Alert
        show={alert}
        variant="primary"
        onClose={() => setAlert(false)}
        dismissible
      >
        Try again, timed out...
        {/* <div className="d-flex justify-content-end">
          <Button onClick={() => setRunning(false)} variant="outline-success">
            Close me y'all!
          </Button>
        </div> */}
      </Alert>
      <table className="table table-hover table-bordered ">
        <thead className="table-dark">
          <tr>
            {headerKeys.map((key, index) => (
              <th key={index} scope="col">
                {key}
              </th>
            ))}
            {/* <th key="status" scope="col">Status</th> */}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {Object.values(item) &&
                Object.values(item).map((val, index) => (
                  <td key={index}>{val}</td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fulfill;
