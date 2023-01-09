import React, { useContext, useState, useEffect } from "react";
import NavBar from "../../components/structure/NavBar";
import Container from "react-bootstrap/esm/Container";
import { useParams } from "react-router-dom";
import { InsertsContext } from "../../context/InsertsContext";
import { useMsal, useAccount } from "@azure/msal-react";
import { protectedResources } from "../../authentication/authConfig";
import { callApiWithToken } from "../../fetch";
import toolFinder from "../../api/ToolFinder";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

const InsertsPage = () => {
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});
  const { id } = useParams();
  const { inserts, setInserts, changeInsert } = useContext(InsertsContext);
  const [state, setState] = useState([]);
  const handleChange = (e) => setState(e.target.value);
 
  useEffect(() => {
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
  }, [account,inProgress, instance, setInserts]);

  const handleInsertChange = (id, change, event) => {
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
              change: event,
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
                      change: event,
                    }
                  );
                })
                .catch((error) => console.log(error));
            }
          }
        });
    }
    changeInsert(id, change, event);
  };

  /**
   * This needs to send the new value of quantity to the backend
   * and also let the user know through the ui that the quantity has changed.
   * This should change two states ig.
   */
  const handleSubmit = () => {
    //idk
    let newQuantity = inserts[id].quantity - state;
    handleInsertChange(id, "quantity", newQuantity);
  };

  return (
    <div>
      <NavBar />
      <Container>
        <div className="box" style={{ display: "flex" }}>
          <div className="first box" style={{ textAlign: "center" }}>
            <h1 style={{ textAlign: "center" }}>
              {inserts && inserts[id] && inserts[id].insertName} <br />
              Insert ID: {id}{" "}
            </h1>
            <img
              className="box"
              src="https://www.haascnc.com/content/dam/haascnc/ecommerce/02-0022/hero.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg"
              alt="insert"
              width={"100%"}
            />
          </div>
          <div
            className="second box"
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", margin: "40px" }}>
              <h3>
                Current Quantity:{" "}
                {inserts && inserts[id] && inserts[id].quantity}
              </h3>
            </div>
            <br />
            <h4 style={{ textAlign: "center" }}>Quantity to take?</h4>
            {/* <div className="box" style={{ height: "75px", width: "100px", display:"flex"}}> */}
            <div>
              <input
                className="box"
                type="text"
                defaultValue={0}
                style={{ border: "" }}
                onChange={(e) => handleChange(e)}
              />
              <input
                type="submit"
                value="Submit"
                style={{
                  margin: "15px",
                }}
                onClick={() => handleSubmit()}
              />
              {/* </div> */}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default InsertsPage;
