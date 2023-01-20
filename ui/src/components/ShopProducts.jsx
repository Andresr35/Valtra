import React from "react";
import { useEffect } from "react";
import ShopifyRequest from "../api/ShopifyRequest";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { VariantsContext } from "../context/VariantsContext"; 
import { useMsal, useAccount } from "@azure/msal-react";
import { protectedResources } from "../authentication/authConfig";
import { aquireToken, callApiWithToken } from "../fetch";
import { InteractionRequiredAuthError } from "@azure/msal-browser"; 
import '../assets/css/Image.css'

//TODO: Document this
const ShopProducts = (props) => {
  let navigate = useNavigate();
  const {variants, setVariants} = useContext(VariantsContext);
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});

  useEffect(() => { 

    // const fetchData = async () => { 
    //   const response = await aquireToken() 

    // }

    const fetchData = () => {
      try {
        if (account && inProgress === "none") {
          instance
            .acquireTokenSilent({
              scopes: protectedResources.apiHello.scopes,
              account: account,
            })
            .then((response) => {
              callApiWithToken(
                response.accessToken,
                ShopifyRequest.getUri() + "/products",
                "GET"
              ).then((response) => {
                setVariants(response.body.data.products.nodes);
              }).catch((error)=>{
                console.log(error)
              })
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
                        ShopifyRequest.getUri() + "/products",
                        "GET"
                      ).then((response) => {
                        setVariants(response.body.data.products.nodes);
                      })
                    })
                    .catch((error) => console.log(error));
                }
              }
            });
        }
      } catch (err) {
        console.log(err);
      }

    };
    fetchData();
  }, [setVariants, accounts, instance,inProgress,account]);



  const handleVariants = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div>
      <Container>
        <Table hover bordered>
          <thead>
            <tr>
              <th>Featured Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Variants</th> 
            </tr>
          </thead>
          <tbody>
            {variants.map((product, index) => (
              <tr key={index}>
                <td className="imageTableWidth">
                  <img  
                    className='ShopProductsTableImage'
                    src={product.featuredImage ? product.featuredImage.url : ""}
                    alt="NA"
                  />
                </td>
                <td>{product.handle}</td>
                <td>{product.description}</td>
                <td>
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleVariants(product.id)}
                  >
                    More info
                  </Button>
                </td> 
              </tr> 
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ShopProducts;
