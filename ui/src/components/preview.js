/*-------------------------------------------------------------  
_______________________TODO:DOCUMENT: Luis
* File:preview.js
* Author:TODO:Luis 
* Date: 08/31/2022
* Description: Summary of what the code inside the file does 
-------------------------------------------------------------*/
import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone'; 
import '../assets/css/Image.css' 
import ShopifyRequest from "../api/ShopifyRequest";      
//auth / token requesting
import { useMsal, useAccount } from "@azure/msal-react";
import { protectedResources } from "../authentication/authConfig";
import { callApiWithToken, aquireToken } from "../fetch";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

function Previews(props) {  
  const { instance, accounts, inProgress } = useMsal();
  var account = useAccount(accounts[0] || {});

  const [files, setFiles] = useState([]);  
  const {getRootProps, getInputProps} = useDropzone({
        accept: {
          'image/*': []
        },
        onDrop: acceptedFiles => {
          setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)  
          }))); 
        } 
      }); 
  
  const sendImage = async (e) => {
    try { 
      e.preventDefault();
      let imageData = new FormData();
      imageData.image = files[0]; 
      console.log(imageData.image)  

      const waitResponse = await aquireToken(account, inProgress, 
        instance, protectedResources) 
      console.log(waitResponse) 
      const response = await callApiWithToken( 
        waitResponse.accessToken, 
        ShopifyRequest.getUri() +`/productVariant`, "PUT",  
          imageData.image, true) 
        
      // const response = await ShopifyRequest.put(`/prodVarImg`, imageData, {
      //   headers: {
      //     "Content-Type": `multipart/form-data`,
      //   },
      // });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }; 

  const refreshPage =async (e) => { 
    window.location.reload(false)
  } 
  const UndoButton = async (e) => { 
    setFiles([])
  }  
  const saveImageButton = async (e) => {  
    sendImage(e)
    //setFiles([]) 
    //refreshPage(e)
  } 

      const thumbs = files.map(file => (
        <div className='thumb' key={file.name}>
          <div className='thumbInner'>
            <img
            alt='ok'
              src={file.preview}
              className='img'
              // Revoke data uri after image is loaded
              onLoad={() => { URL.revokeObjectURL(file.preview) }}  
            /> 
          </div>
        </div>
      ));
      useEffect(() => { 
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview)); 
      }, []); 
      
  return ( 
    <>  
      <div {...getRootProps({className: 'dropzone'})}> 
        <input {...getInputProps() } name="image"/> 
        <p className='dragNdrop'>Choose File(s)</p>  
        <p className='chosenFile'>{!files[0] ? 'No File Chosen':files[0].name}</p> 
        <div className='brightness'>   
          <img
            className="thumbnail image"
            src={props.currImage}
            alt="Add one?"/>   
        </div>  
        </div> 
        <aside className='thumbsContainer'> 
          {thumbs} 
          <div> 
            <div>
              {!files[0] ? '':<button className='previewButton' onClick={(e) => saveImageButton(e)}>Save Image</button>} 
            </div> 
            <div>
              {!files[0] ? '':<button className='previewButtons' onClick={(e)=>UndoButton(e)}>Undo Image</button>}  
            </div>   
          </div>   
        </aside>       
    </> 
  );
} 
 
export default Previews;  