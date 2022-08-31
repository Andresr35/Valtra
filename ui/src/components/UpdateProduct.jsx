import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { useEffect } from "react";
import ProductFinder from "../api/ProductFinder";
import { useMsal, useAccount } from "@azure/msal-react";
import { protectedResources } from "../authentication/authConfig";
import { callApiWithToken,aquireToken } from "../fetch";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
//NOTE: I dont think this page is being used anymore or should be used since, they are
//  connected to the database which grabs from shopify

const UpdateProduct = (props) => {
  // Initializing Constants
  const { instance, accounts, inProgress } = useMsal();
  var account = useAccount(accounts[0] || {});
  let navigate = useNavigate();
  const { id } = useParams();
  const [ids, setID] = useState("");
  const [description, setDescription] = useState("");

  //FIXME: backend needs to get fixed from new db
  useEffect(() => {

    const fetchData = async() => {
       //neww
       
      const response = await aquireToken()

      const backendResponse = await callApiWithToken(
        response.accessToken,
        ProductFinder.getUri() + `/${id}`,
        "GET")

        console.log(backendResponse);
        setID(backendResponse.data.products.id);
        setDescription(backendResponse.data.products.description);
      



        //old
      if (account && inProgress === "none") {
        instance
          .acquireTokenSilent({
            scopes: protectedResources.apiHello.scopes,
            account: account,
          })
          .then((response) => {
            callApiWithToken(
              response.accessToken,
              ProductFinder.getUri() + `/${id}`,
              "GET"
            ).then((response) => {
              console.log(response);
              setID(response.data.products.id);
              setDescription(response.data.products.description);
            });
            // .catch((err) => console.log(err));
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
                      ProductFinder.getUri() + `/${id}`,
                      "GET"
                    ).then((response) => {
                      setID(response.data.data.products.id);
                      setDescription(response.data.data.products.description);
                    });
                  })
                  .catch((error) => console.log(error));
              }
            }
          });
      }
    };

    fetchData();

  }, [id, account, inProgress, instance]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (account && inProgress === "none") {
      instance
        .acquireTokenSilent({
          scopes: protectedResources.apiHello.scopes,
          account: account,
        })
        .then((response) => {
          callApiWithToken(
            response.accessToken,
            ProductFinder.getUri() + `/${id}`,
            "PUT",
            {
              ids,
              description,
            }
          );
          // .catch((err) => console.log(err));
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
                    ProductFinder.getUri() + `/${id}`,
                    "PUT",
                    {
                      ids,
                      description,
                    }
                  );
                })
                .catch((error) => console.log(error));
            }
          }
        });
    }
    navigate("/");
  };

  const style = { marginLeft: ".7rem", marginRight: ".7rem" };

  return (
    <div>
      <Container>
        <form action="">
          {/* This is the form part for changing the id */}
          <div className="form-group">
            <label style={style} htmlFor="id">
              ID
            </label>
            <input
              style={style}
              value={ids}
              onChange={(e) => setID(e.target.value)}
              type="text"
              className="form-control"
              id="id"
            />
          </div>
          {/* this is the form part for the description */}

          <div className="form-group">
            <label style={style} htmlFor="description">
              Description
            </label>
            <input
              style={style}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="form-control"
              id="description"
            />
          </div>
          <button
            style={style}
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Update
          </button>
        </form>
      </Container>
    </div>
  );
};

export default UpdateProduct;
