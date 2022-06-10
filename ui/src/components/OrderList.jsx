import React, { useContext,useEffect, useState } from 'react'
import OrderFinder from '../api/OrderFinder';
import PDFFinder from '../api/PDFFinder';
import { OrdersContext } from '../context/OrdersContext'
import { writeFile } from 'fs';

const OrderList = (props) => {
    const {orders,setOrders} = useContext(OrdersContext);
    //get data from backed
    const [file,setFile] = useState();
    const [array,setArray] = useState([]);
    const fileReader = new FileReader();

    const handleOnChange = (e) =>{
      setFile(e.target.files[0]);
    };
    const csvFileToArray = string =>{
      const csvHeader = string.slice(0,string.indexOf("\n")).split(",");
      const csvRows = string.slice(string.indexOf("\n")+1).split("\n");

      const array = csvRows.map(i =>{
        const values = i.split(",");
        const obj = csvHeader.reduce((object,header,index) =>{
          object[header] = values[index];
          return object;
        },{});
        
        return obj;
      });
     setArray(array)
      sendData(array);
    };

    const handleOnSubmit =async(e) =>{
      e.preventDefault();
      if  (file){
        fileReader.onload = function (event) {
          const text = event.target.result;
          csvFileToArray(text);
        };
         fileReader.readAsText(file);
         
      }

    };

    const headerKeys = Object.keys(Object.assign({}, ...array));

    const sendData = (array) =>{
      try {OrderFinder.put("/orderss",{
        sent:"success",
        data: array.map((item) =>
        {Object.values(item)}
        )
      })}catch(err){
        console.log(err);
      }
    }
    
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

    //send request to server to give pdf???
    const handlePDF=async()=>{
        try{
            const response =await PDFFinder.post('/orders',{
                data:{
                    author: "Gary Lee",
                    Company: {
                      Name: "Company Name 1",
                    },
                    Items: [
                      {
                        ItemId: 1,
                        Description: "Sample Description 1",
                        Quantity: 2,
                        UnitPrice: 100
                      },
                      {
                        ItemId: 2,
                        Description: "Sample Description 2",
                        Quantity: 4,
                        UnitPrice: 150
                      },

                    ],
                    OrderDetails: {
                      Number: "12424sda",
                      Date: "12/06/2021",
                      Tax: 345.23,
                     Shipping: 820,
                      Other: 0
                    }
                },
                responseType: 'stream',
            });
            const pdfContents = response.data;
            await writeFile('file.pdf',pdfContents);

        }catch(err){console.log(err)}
    }

  return (

    <div className='list-group'>
        <div>
            <button onClick={()=>{handlePDF()}} type='button' className="btn btn-primary" disabled data-bs-toggle="button">Dowload PDF</button>
{/*      the second button thing for the csv download       */}
            <form>
                <input type={"file"} id={"csvFileInput"} onChange={handleOnChange} accept={".csv"} />
                <button onClick={(e) => {handleOnSubmit(e)}}>IMPORT CSV</button>
            </form>
            {/* this is the table for the csv values */}
            <table className="table table-hover table-bordered ">
              <thead className='table-dark'>
                <tr key={"header"}>
                  {headerKeys.map((key) => (
                    <th scope = "col">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {array.map((item) => (
                  <tr key={item.id}>
                    {Object.values(item) &&Object.values(item).map((val) => (
                      <td>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
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
