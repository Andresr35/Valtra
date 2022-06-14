import React,{useState} from 'react'
import OrderFinder from '../api/OrderFinder';

const Fulfill = () => {

    const [file,setFile] = useState();
    const [array,setArray] = useState([]);
    const fileReader = new FileReader();

    const handleOnChange = (e) =>{
        setFile(e.target.files[0]);
    };
    
    //just the setup of the array
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
        for(const obj in array){
            if(!(array[obj])[Object.keys(array[obj])[0]]){
            array.splice(obj,1);
            }
        }
        setArray(array)
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
    
    const headerKeys = Object.keys(Object.assign({}, ...array));
    
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
            }).then(response => {console.log(response.data);updateStatus(response.data,array)})
        }catch(err){
          console.log(err);
        }
    }
    const updateStatus = (response,test) => {
        
        for(const obj in test){
            for(const order in response.orders){
                if(test[obj].Name === response.orders[order].name.replace("#", "")){
                    test[obj].status = response.orders[order].status;
                    break;
                }
            }
        }
        setArray(test)
        console.log(test)
        console.log("ran")
        //add a key and value to the array
    }
     

  return (
    <div>
        <form>
            <input type={"file"} id={"csvFileInput"} onChange={handleOnChange} accept={".csv"} />
            <button onClick={(e) => {handleOnSubmit(e)}}>IMPORT CSV</button>
        </form>
    {/* this is the table for the csv values */}
        <table className="table table-hover table-bordered ">
            <thead className='table-dark'>
                <tr>
                    {headerKeys.map((key,index) => (
                    <th key={index} scope = "col">{key}</th>
                    ))}
                    <th key="status" scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                {array.map((item,index) => (
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
  )
}

export default Fulfill
