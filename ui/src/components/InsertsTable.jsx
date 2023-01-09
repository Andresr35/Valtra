/**
 * This page is where I will have the frontend for the inserts table. I should be
 * able to edit each part of the table and update the backend here. I should also be able
 * to go to a specific insert page. Nothing much different from the excel.
 */
import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { useMsal, useAccount } from "@azure/msal-react";
import { protectedResources } from "../authentication/authConfig";
import { callApiWithToken } from "../fetch";
import toolFinder from "../api/ToolFinder";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import Modal from "react-bootstrap/Modal";
import { InsertsContext } from "../context/InsertsContext";
import { useNavigate } from "react-router-dom";



const InsertsTable = () => {
  const { instance, accounts, inProgress } = useMsal();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const { inserts, setInserts, changeInsert } = useContext(InsertsContext);
  const account = useAccount(accounts[0] || {});
  
  let navigate = useNavigate();
  useEffect(() => {
    /**
     * gets inserts in database
     */
    const fetchData = () => {
      if (account && inProgress === "none") {
        instance
          .acquireTokenSilent({
            scopes: protectedResources.apiHello.scopes,
            account: account,
          })
          .then((response) => {
            callApiWithToken(
              response.accessToken,
              toolFinder.getUri() + "/insertsTable",
              "GET"
            ).then((response) => {
              setInserts(response.body);
            });
          })
          .catch((error) => {
            if (error instanceof InteractionRequiredAuthError) {
              if (account && inProgress === "none") {
                instance
                  .acquireTokenPopup({
                    scopes: protectedResources.apiHello.scopes,
                  })
                  .then((response) => {
                    callApiWithToken(
                      response.accessToken,
                      toolFinder.getUri() + "/insertsTable",
                      "GET"
                    ).then((response) => console(response));
                  })
                  .catch((error) => console.log(error));
              }
            }
          });
      }
    };
    fetchData();
  }, [account, inProgress, instance, setInserts]);

  /**
   * When enter is clicked, the form is submitted and changes the quantity in db
   * @param {string} change "quantity","insertName" or whatever 
   * @param {object} event event handler

   * column you want to change
   * 
   */
  const handleInsertChange = (id, change, event) => {
    if (event.key === "Enter") {
      if (account && inProgress === "none") {
        instance
          .acquireTokenSilent({
            scopes: protectedResources.apiHello.scopes,
            account: account,
          })
          .then((response) => {
            callApiWithToken(
              response.accessToken,
              toolFinder.getUri() + `/inserts/${id}/${change}`,
              "PUT",
              {
                type: "success",
                change: event.target.value,
              }
            );
          })
          .catch((error) => {
            if (error instanceof InteractionRequiredAuthError) {
              if (account && inProgress === "none") {
                instance
                  .acquireTokenPopup({
                    scopes: protectedResources.apiHello.scopes,
                  })
                  .then((response) => {
                    callApiWithToken(
                      response.accessToken,
                      toolFinder.getUri() + `/inserts/${id}/${change}`,
                      "PUT",
                      {
                        sent: "success",
                        change: event.target.value,
                      }
                    );
                  })
                  .catch((error) => console.log(error));
              }
            }
          });
      }
      changeInsert(id,change,event);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Inserts Table</h1>
      <div className="list-group">
        <table className="table table-hover table-bordered ">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Insert Name</th>
              <th scope="col" style={{ width: "20%" }}>
                Quantity
              </th>
              <th scope="col" style={{ width: "20%" }}>
                Link
              </th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {inserts &&
              Object.keys(inserts).map((key, index) => {
                return (
                  <tr key={index}>
                    <td>
                        <button onClick={()=>navigate(`/inserts/${key}`)}>{key}</button>
                    </td>
                    <td>
                      <input
                        type="text"
                        name={inserts[key].insertName}
                        id={key}
                        defaultValue={inserts[key].insertName}
                        style={{
                          textAlign: "center",
                          border: "hidden",
                        }}
                        onKeyDown={(e) =>
                          handleInsertChange(key, "insertName", e)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name={inserts[key].insertName}
                        id={inserts[key].id}
                        defaultValue={inserts[key].quantity}
                        style={{
                          textAlign: "center",
                          border: "hidden",
                          height: "50px",
                        }}
                        onKeyDown={(e) =>
                          handleInsertChange(key, "quantity", e)
                        }
                      />
                    </td>
                    <td>
                      <div>
                        <a href={`${inserts[key].link}`}>{inserts[key].link}</a>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="btn btn-dark"
                          onClick={handleShow}
                        >
                          Edit?
                        </button>
                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>
                              {inserts[key].insertName} Link
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <input
                              type="text"
                              name={inserts[key].insertName}
                              id={key}
                              defaultValue={inserts[key].link}
                              style={{
                                textAlign: "center",
                                height: "100px",
                                width: "400px",
                              }}
                              onKeyDown={(e) =>
                                handleInsertChange(key, "link", e)
                              }
                            />
                          </Modal.Body>
                          <Modal.Footer>
                            <button
                              type="button"
                              className="btn btn-dark"
                              onClick={handleClose}
                            >
                              Close
                            </button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </td>
                    <td>
                      <input
                        name={inserts[key].insertName}
                        id={key}
                        defaultValue={inserts[key].price}
                        style={{
                          textAlign: "center",
                          border: "",
                        }}
                        onKeyDown={(e) => handleInsertChange(key, "price", e)}
                      />
                    </td>
                  </tr>
                );
              })}
            <tr>
              <td>NA</td>
              <td>text</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InsertsTable;
