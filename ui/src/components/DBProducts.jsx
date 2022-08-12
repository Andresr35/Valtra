import React, { useEffect, useContext } from "react";
import ProductFinder from "../api/ProductFinder";
import { ProductsContext } from "../context/ProductsContext";
import { useNavigate } from "react-router-dom";
import { useMsal, useAccount } from "@azure/msal-react";
import { protectedResources } from "../authentication/authConfig";
import { callApiWithToken } from "../fetch";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

/**
 * Lists all the products from the localhost database... this is a test 
 * for the later actual products on the database. This will get replaced by the 
 * shopify products page right now
 */
const ProductList = (props) => {
  const { products, setProducts } = useContext(ProductsContext);
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});
  let navigate = useNavigate();
  

  // GETs the data from backend and puts them in the products context
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
              ProductFinder.getUri() + "/",
              "GET"
            ).then((response) => {
              setProducts(response.data.products);
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
                      ProductFinder.getUri() + "/",
                      "GET"
                    ).then((response) => setProducts(response.data.products));
                  })
                  .catch((error) => console.log(error));
              }
            }
          });
      }
    };

    fetchData();
  }, [setProducts,accounts, instance,inProgress,account]);




// Event handler for delete products on tablee
    const handleDelete= (id)=>{
      
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
              "DELETE"
            ).then(
              setProducts(products.filter(product=>{
                return product.id !== id;
            }
            ))
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
                      ProductFinder.getUri() + `/${id}`,
                      "DELETE"
                    ).then(
                      setProducts(products.filter(product=>{
                        return product.id !== id;
                    }
                    ))
                    );
                  })
                  .catch((error) => console.log(error));
              }
            }
          });
      }
    }



  // Event handler for updating products on table
  const handleUpdate = (id) => {
    navigate(`/products/${id}/update`);
  };



  //actual html of the product table
  return (
    <div className="list-group">
      <table className="table table-hover table-bordered ">
        <thead className="table-dark">
          <tr>
            <th scope="col">id</th>
            <th scope="col">description</th>
            <th scope="col">edit</th>
            <th scope="col">delete</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.description}</td>
                  <td>
                    <button
                      onClick={() => handleUpdate(product.id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
