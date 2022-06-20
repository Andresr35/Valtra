import React, { useContext,useEffect}  from 'react'
import OrderFinder from '../api/OrderFinder';
//import PDFFinder from '../api/PDFFinder';
import { OrdersContext } from '../context/OrdersContext'
//import { writeFile } from 'fs';

const OrderList = (props) => {
    const {orders,setOrders} = useContext(OrdersContext);
    //get data from backed
     
    useEffect( () => {
        const fetchData = async() => {
            try{
                const response = await OrderFinder.get("/orders");
                setOrders(response.data.result);

             }catch(err){console.log("didnt work")}
        };
        fetchData(); 
    },[setOrders]);

    //send request to server to give pdf???
    const handlePDF=async()=>{
        // try{
        //     const response =await PDFFinder.post('/orders',{
        //         data:{
        //             author: "Gary Lee",
        //             Company: {
        //               Name: "Company Name 1",
        //             },
        //             Items: [
        //               {
        //                 ItemId: 1,
        //                 Description: "Sample Description 1",
        //                 Quantity: 2,
        //                 UnitPrice: 100
        //               },
        //               {
        //                 ItemId: 2,
        //                 Description: "Sample Description 2",
        //                 Quantity: 4,
        //                 UnitPrice: 150
        //               },

        //             ],
        //             OrderDetails: {
        //               Number: "12424sda",
        //               Date: "12/06/2021",
        //               Tax: 345.23,
        //              Shipping: 820,
        //               Other: 0
        //             }
        //         },
        //         responseType: 'stream',
        //     });
        //     //const pdfContents = response.data;
        //     // await writeFile('file.pdf',pdfContents);

        // }catch(err){console.log(err)}
    }

  return (

    <div className='list-group'>
        <div>
            <button onClick={()=>{handlePDF()}} type='button' className="btn btn-primary" disabled data-bs-toggle="button">Dowload PDF</button>
            
        </div>

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
