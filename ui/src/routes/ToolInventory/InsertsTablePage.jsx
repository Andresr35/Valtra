import NavBar from '../../components/structure/NavBar'
import Container from 'react-bootstrap/esm/Container'
import React, { useEffect, useContext, useState } from "react";
import { useMsal, useAccount } from "@azure/msal-react";
import { protectedResources } from "../../authentication/authConfig";
import { callApiWithToken } from "../../fetch";
import toolFinder from "../../api/ToolFinder";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import Modal from "react-bootstrap/Modal";
import { InsertsContext } from "../../context/InsertsContext";
import { useNavigate } from "react-router-dom";
import TableInput from '../../components/TableInput';

const InsertPage = () => {
  const { instance, accounts, inProgress } = useMsal();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [newInsert, setNewInsert] = useState({ insertName: "0", quantity: 0, link: " ", price: "0.00" })
  const { inserts, setInserts, changeInsert } = useContext(InsertsContext);
  const account = useAccount(accounts[0] || {});

  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (account && inProgress === "none") {
        try {
          const azureResponse = await instance.acquireTokenSilent({
            scopes: protectedResources.apiHello.scopes,
            account: account,
          })

          const apiResponse = await callApiWithToken(
            azureResponse.accessToken,
            toolFinder.getUri() + "/insertsTable", "GET"
          )

          setInserts(apiResponse.body)


        } catch (error) {

          if (error instanceof InteractionRequiredAuthError) {
            if (account && inProgress === "none") {
              instance
                .acquireTokenPopup({
                  scopes: protectedResources.apiHello.scopes,
                })

            } else {
              console.log(error)
            }
          }
        }
      }
    };
    fetchData();
  }, [account, inProgress, instance, setInserts]);

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
      changeInsert(id, change, event);
    }
  };

  const handleNewInsertChange = (change, e) => {
    let clone = Object.assign({}, newInsert)
    Object.assign(clone, { [change]: e.target.value })
    setNewInsert(clone)
  };

  const handleSubmit = async () => {
    try {
      if (account && inProgress === "none") {
        const azureResponse = await instance.acquireTokenSilent({
          scopes: protectedResources.apiHello.scopes,
          account: account,
        })

        const apiResponse = await callApiWithToken(
          azureResponse.accessToken,
          toolFinder.getUri() + "/inserts",
          "POST", {
          insertName: newInsert.insertName,
          quantity: newInsert.quantity,
          link: newInsert.link,
          price: newInsert.price
        })

        setInserts(apiResponse.data);
      }
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError && (account && inProgress === "none")) {
        instance.acquireTokenPopup({
          scopes: protectedResources.apiHello.scopes,
        })
      } else {
        console.log(error)
      }
    }

    setNewInsert({ diameter: "0", quantity: 0,link:" ", price: "0.00" })
    setShow(true)
  }

  return (
    <div>
      <NavBar />
      <Container>
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
                          <button onClick={() => navigate(`/inserts/${key}`)}>{key}</button>
                        </td>
                        <td>
                          <TableInput
                            type="text"
                            test={{ key }}
                            tool={inserts}
                            handleChange={handleInsertChange}
                            description="insertName"
                            name="insertName"
                          />
                        </td>
                        <td>
                          <TableInput
                            type="number"
                            test={{ key }}
                            tool={inserts}
                            handleChange={handleInsertChange}
                            description="quantity"
                            name="insertName"
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
                          <TableInput
                            type="text"
                            test={{ key }}
                            tool={inserts}
                            handleChange={handleInsertChange}
                            description="price"
                            name="insertName"
                          />
                        </td>
                      </tr>
                    );
                  })}
                <tr>
                  <td>
                    "NA"
                  </td>
                  <td>
                    <input
                      value={newInsert.insertName}
                      onChange={(e) => { handleNewInsertChange("insertName", e) }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={newInsert.quantity}
                      onChange={(e) => { handleNewInsertChange("quantity", e) }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={newInsert.link}
                      onChange={(e) => { handleNewInsertChange("link", e) }}
                    />
                  </td>
                  <td>
                    <input
                      value={newInsert.price}
                      onChange={(e) => handleNewInsertChange("price", e)}
                    />
                    <button
                      onClick={() => handleSubmit()}>Add</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default InsertPage
