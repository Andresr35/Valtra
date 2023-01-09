import React, { useContext, useEffect } from "react";
import ShopifyRequest from "../api/ShopifyRequest";
//import PDFFinder from '../api/PDFFinder';
import { OrdersContext } from "../context/OrdersContext";
import { useMsal, useAccount } from "@azure/msal-react";
//import { writeFile } from 'fs';
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { protectedResources } from "../authentication/authConfig";
import { callApiWithToken } from "../fetch";

const OrderList = (props) => {
  const { orders, setOrders } = useContext(OrdersContext);
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});

  // TODO: document this codes 
  //TODO: catch all errors
  useEffect(() => {
    // console.log(accounts)
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
              ShopifyRequest.getUri() + "/orders",
              "GET"
            ).then((response) => {
               setOrders(response.result);
            }).catch((err)=>console.log(err))
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
                      ShopifyRequest.getUri() + "/orders",
                      "GET"
                    ).then((response) => setOrders(response.data.result));
                  })
                  .catch((error) => console.log(error));
              }
            }
          });
      }
            
    };
    fetchData();
  }, [setOrders, accounts, instance,inProgress,account]);

  //send request to server to give pdf???

  return (
    <div className="list-group">
      <table className="table table-hover table-bordered ">
        <thead className="table-dark">
          <tr>
            <th scope="col">api id</th>
            <th scope="col">order number</th>
            <th scope="col">created at</th>
            <th scope="col">subtotal</th>
            <th scope="col">tax</th>
            <th scope="col">total</th>
            <th scope="col">financial status</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => {
              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.name}</td>
                  <td>{order.created_at}</td>
                  <td>${order.current_subtotal_price}</td>
                  <td>${order.current_total_tax}</td>
                  <td>${order.current_total_price}</td>
                  <td>{order.financial_status}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
