import NavBar from '../../components/structure/NavBar'
import Container from 'react-bootstrap/esm/Container'
import React, { useEffect,useState } from 'react'
import { useMsal, useAccount } from "@azure/msal-react";
import { protectedResources } from '../../authentication/authConfig';
import { callApiWithToken } from "../../fetch";
import toolFinder from "../../api/ToolFinder";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import TableInput from '../../components/TableInput';

const EndmillsTablePage = () => {

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
      <NavBar />
      <Container>
        <div>
          <h1 style={{ textAlign: "center" }}>Endmills Table</h1>
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
                  Object.keys(endmills).map((key, index) => {
                    return (
                      <tr key={index}>
                        <td>{key}</td>
                        <td>
                          <TableInput
                            type="text"
                            test={{ key }}
                            tool={endmills}
                            handleChange={handleEndmillChange}
                            description="endmillsName"
                            name="endmillsName"
                          />
                        </td>
                        <td>
                          <TableInput
                            type="number"
                            test={{ key }}
                            tool={endmills}
                            handleChange={handleEndmillChange}
                            description="quantity"
                            name="endmillsName"
                          />
                        </td>
                        <td>
                          <TableInput
                            type="text"
                            test={{ key }}
                            tool={endmills}
                            handleChange={handleEndmillChange}
                            description="price"
                            name="endmillsName"
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
      </Container>
    </div>
  );
};

export default EndmillsTablePage;
