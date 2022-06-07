import React, { useContext,useEffect } from 'react'
import OrderFinder from '../api/OrderFinder';
import { OrdersContext } from '../context/OrdersContext'

const OrderList = (props) => {
    const {orders,setOrders} = useContext(OrdersContext);
    //get data from backed

    
    useEffect( () => {
        const fetchData = async() => {
            try{
                const response = await OrderFinder.get("/orders");
                setOrders(response.data.result);
                console.log(response)
             }catch(err){console.log("didnt work")}
        };
        fetchData(); 
    },[]);

  return (
    <div className='list-group'>
    <table className="table table-hover table-bordered ">
        <thead className='table-dark'>
            <tr>
                <th scope = "col">api id</th>
                <th scope = "col">order number</th>
                <th scope = "col">created at</th>
                <th scope = "col">subtotal</th>
                <th scope = "col">tax</th>
                <th scope = "col">total</th>
                <th scope = "col">financial status</th>
            </tr>
        </thead>
        <tbody>
            {orders && orders.map(order => {
                return(
                  <tr key = {order.id}>
                      <td>{order.id}</td>
                      <td>{order.name}</td>
                      <td>{order.created_at}</td>
                      <td>${order.current_subtotal_price}</td>
                      <td>${order.current_total_tax}</td>
                      <td>${order.current_total_price}</td>
                      <td>{order.financial_status}</td>

                  </tr>
                )})}
        </tbody>
    </table>
  </div>
  )
}

export default OrderList
