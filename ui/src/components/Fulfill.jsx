import React,{useState} from 'react'
import OrderFinder from '../api/OrderFinder';
import {CSVLink} from "react-csv";

const Fulfill = (props) => {

    const [file,setFile] = useState();
    const [data,setData] = useState([]);
    const fileReader = new FileReader();

    const handleOnChange = (e) =>{
        setFile(e.target.files[0]);
    };
    
    //just the setup of the array
    const csvFileToArray = string =>{
        const csvHeader = string.slice(0,string.indexOf("\n")).split(",");
        csvHeader.push("Status")
        const csvRows = string.slice(string.indexOf("\n")+1).split("\n");
        const array = csvRows.map(i =>{
            const values = i.split(",");
            const obj = csvHeader.reduce((object,header,index) =>{
            object[header] = values[index];
            return object;
            },{});
            return obj;
        });
        for(const obj in array){
            if(!(array[obj])[Object.keys(array[obj])[0]]){
            array.splice(obj,1);
            }
        }
        setData(array)
        sendData(array);
    };      




    //what happens when they press the button
    const handleOnSubmit =async(e) =>{
        e.preventDefault();
        if(file){
          fileReader.onload = function (event) {
            const text = event.target.result;
            csvFileToArray(text);

          };
        fileReader.readAsText(file); 
        }
    };
    
    const headerKeys = Object.keys(Object.assign({}, ...data));

    //this runs when the button is pressed.
    const sendData = (array) =>{
        try {
          //array.pop();
          for(const obj in array){
            (array[obj])["Tracking"] = (array[obj])[Object.keys(array[obj])[1]];
            delete (array[obj])[Object.keys(array[obj])[1]];
            var value  = (array[obj])["Tracking"].replace(/(\r\n|\n|\r)/gm, "");
            (array[obj])["Tracking"] = value;
          }
            OrderFinder.put("/orderss",{
                sent:"success",
                data:array        
            }).then((response) => {updateStatus(response.data,array)})
            .catch(err => console.log(err))
        }catch(err){
          console.log(err);
        }
    }
    const updateStatus = (response,prevArray) => {
        
        for(const obj in prevArray){
            for(const order in response.orders){
                if(prevArray[obj].Name === response.orders[order].name.replace("#", "")){
                    prevArray[obj].Status = response.orders[order].Status;
                    break;
                }
            }
        }
        const newArray = [...prevArray];
        setData(newArray);
    }
   
    const headers = [
        {label: "Name", key:"Name"},
        {label: "Status", key:"Status"},
        {label: "Tracking", key:"Tracking"}
    ];

    const csvReport = {
        filename: 'report.csv',
        headers:headers,
        data:data
    };
  return (
    <div>   
        <div>
            <h1 style={{textAlign: 'center'}}>Import CSV to Fulfill Orders</h1>
        </div>
        <div className='container'>
            <div className="row">
                <form>
                    <div className="col col-lg-2">
                        <input type={"file"}  className="form-control" id={"csvFileInput"} onChange={handleOnChange} accept={".csv"} />
                    </div>
                    <div className="col">
                        <button type='button' id="inputGroupFileAddon04" className='btn btn-outline-secondary' onClick={(e) => {handleOnSubmit(e)}}>Import CSV</button>
                    </div>
                </form>
                
            </div>
            <div className="row">
                <div className="col">
                <CSVLink className='btn btn-primary' {...csvReport} >Export</CSVLink>
                </div>
            </div>
            
        </div>
        <table className="table table-hover table-bordered ">
            <thead className='table-dark'>
                <tr>
                    {headerKeys.map((key,index) => (
                    <th key={index} scope = "col">{key}</th>
                    ))}
                    {/* <th key="status" scope="col">Status</th> */}
                </tr>
            </thead>
            <tbody>
                {data.map((item,index) => (
                    <tr key={index}>
                        {Object.values(item) && Object.values(item).map((val,index) => (
                            <td key={index}>{val}</td>
                            ))
                        }
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}

export default Fulfill
