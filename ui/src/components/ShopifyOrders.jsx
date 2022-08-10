import React, { useContext, useEffect } from "react";
import ShopifyRequest from "../api/ShopifyRequest";
//import PDFFinder from '../api/PDFFinder';
import { OrdersContext } from "../context/OrdersContext";
import { useMsal } from "@azure/msal-react";  
//import { writeFile } from 'fs';

const OrderList = (props) => {
  const { orders, setOrders } = useContext(OrdersContext);
  const { accounts } = useMsal();

  let name = accounts[0] && accounts[0].name;  
  //get data from backed

  useEffect(() => {
    console.log(accounts)
    const fetchData = async () => {
      try {
        const response = await ShopifyRequest.get("/orders",{
          data:name,
        });
        setOrders(response.data.result);
      } catch (err) {
        console.log("didnt work");
      }
    };
    fetchData();
  }, [setOrders]);

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
