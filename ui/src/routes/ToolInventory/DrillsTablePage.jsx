import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import NavBar from '../../components/structure/NavBar'
import { useMsal, useAccount } from '@azure/msal-react'
import { protectedResources } from '../../authentication/authConfig'
import { callApiWithToken } from '../../fetch'
import toolFinder from '../../api/ToolFinder'
import { InteractionRequiredAuthError } from '@azure/msal-browser'
import TableInput from '../../components/TableInput'
import { DrillsContext } from '../../context/DrillsContext'
import Alert from 'react-bootstrap/Alert'

const DrillsTablePage = () => {
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [show, setShow] = useState(false);
  const { drills, setDrills } = useContext(DrillsContext);
  const [newDrill, setNewDrill] = useState({ diameter: "0", quantity: 0, price: "0.00" })
  const [inputValue, setInputValue] = useState("")


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
            toolFinder.getUri() + "/drillsTable",
            "GET"
          )
          setDrills(apiResponse.body);
        } catch (error) {
          if (error instanceof InteractionRequiredAuthError) {
            if (account && inProgress === "none") {
              instance.acquireTokenPopup({
                scopes: protectedResources.apiHello.scopes,
              })
            }
          } else {
            console.log(error)
          }
        }
      }
    };
    fetchData();
  }, [account, inProgress, instance, setDrills]);

  const handleDrillChange = (id, change, event) => {
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
              toolFinder.getUri() + `/drills/${id}/${change}`,
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
                      toolFinder.getUri() + `/drills/${id}/${change}`,
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
    }
  };

  const handleNewDrillChange = (change, e) => {
    let clone = Object.assign({}, newDrill)
    Object.assign(clone, { [change]: e.target.value })
    setNewDrill(clone)
  };

  /**
   * This sends the new drill to the api...
   * when it gets the sucess back from 
   */
  const handleSubmit = async () => {
    try {
      if (account && inProgress === "none") {
        const azureResponse = await instance.acquireTokenSilent({
          scopes: protectedResources.apiHello.scopes,
          account: account,
        })

        const apiResponse = await callApiWithToken(
          azureResponse.accessToken,
          toolFinder.getUri() + "/drills",
          "POST", {
          diameter: newDrill.diameter,
          quantity: newDrill.quantity,
          price: newDrill.price
        })

        setDrills(apiResponse.data);
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

    setNewDrill({ diameter: "0", quantity: 0, price: "0.00" })
    setShow(true)
  }

  /**
   * 
   * @returns JSX.Element of alert
   */
  const AddedToolAlert = () => {
    if (show) {
      return (
        <>
          <Alert variant={"secondary"} onClick={() => setShow(false)} onClose={() => setShow(false)} dismissible >
            Added!
          </Alert>
        </>
      )
    }
  }

  return (
    <div>
      <NavBar />
      <Container>
        <div>
          <div>
            <h1 style={{ textAlign: "center" }}>Drills Table</h1>
            <div className="list-group">
              <table className="table table-hover table-bordered ">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Drill Diameter</th>
                    <th scope="col" style={{ width: "20%" }}>
                      Quantity
                    </th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {drills &&
                    Object.keys(drills).map((key, index) => {
                      return (
                        <tr key={index}>
                          <td>{key}</td>
                          <td>
                            <TableInput
                              type="text"
                              test={{ key }}
                              tool={drills}
                              handleChange={handleDrillChange}
                              description="diameter"
                              name="diameter"
                            />
                          </td>
                          <td>
                            <TableInput
                              type="number"
                              test={{ key }}
                              tool={drills}
                              handleChange={handleDrillChange}
                              description="quantity"
                              name="diameter"
                            />
                          </td>
                          <td>
                            <TableInput
                              type="text"
                              test={{ key }}
                              tool={drills}
                              handleChange={handleDrillChange}
                              description="price"
                              name="diameter"
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
                        value={newDrill.diameter}
                        onChange={(e) => { handleNewDrillChange("diameter", e) }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={newDrill.quantity}
                        onChange={(e) => { handleNewDrillChange("quantity", e) }}
                      />
                    </td>
                    <td>
                      <input
                        value={newDrill.price}
                        onChange={(e) => handleNewDrillChange("price", e)}
                      />
                      <button
                        onClick={() => handleSubmit()}>Add</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div>
                <AddedToolAlert />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default DrillsTablePage
