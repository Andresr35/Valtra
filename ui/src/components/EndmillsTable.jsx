import React, { useEffect } from 'react'
import { useState } from "react";
import { useMsal, useAccount } from "@azure/msal-react";
import { protectedResources } from "../authentication/authConfig";
import { callApiWithToken } from "../fetch";
import toolFinder from "../api/ToolFinder";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

const EndmillsTable = () => {
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [endmills, setEndmills] = useState([]);


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
                  toolFinder.getUri() + "/endmillsTable",
                  "GET"
                ).then((response) => {
                  setEndmills(response.body);
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
                          toolFinder.getUri() + "/endmillsTable",
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
      }, [account, inProgress, instance]);

      const handleEndmillChange = (id, change, event) => {
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
                  toolFinder.getUri() + `/endmills/${id}/${change}`,
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
                          toolFinder.getUri() + `/endmills/${id}/${change}`,
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
    

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Inserts Table</h1>
      <div className="list-group">
        <table className="table table-hover table-bordered ">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Endmill Name</th>
              <th scope="col" style={{ width: "20%" }}>
                Quantity
              </th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {endmills &&
              Object.keys(endmills).map((key,index) => {
                return (
                  <tr key={index}>
                    <td>{key}</td>
                    <td>
                      <input
                        type="text"
                        name={endmills[key].endmillsName}
                        id={key}
                        defaultValue={endmills[key].endmillsName}
                        style={{
                          textAlign: "center",
                          border: "hidden",
                        }}
                        onKeyDown={(e) =>
                          handleEndmillChange(key, "endmillsName", e)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name={endmills[key].endmillsName}
                        id={key}
                        defaultValue={endmills[key].quantity}
                        style={{
                          textAlign: "center",
                          border: "hidden",
                          height: "50px",
                        }}
                        onKeyDown={(e) =>
                          handleEndmillChange(key, "quantity", e)
                        }
                      />
                    </td>
                    <td>
                      <input
                        name={endmills[key].endmillsName}
                        id={key}
                        defaultValue={endmills[key].price}
                        style={{
                          textAlign: "center",
                          border: "",
                        }}
                        onKeyDown={(e) =>
                          handleEndmillChange(key, "price", e)
                        }
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
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EndmillsTable
