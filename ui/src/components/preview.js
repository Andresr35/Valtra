/*-------------------------------------------------------------  
_______________________TODO:DOCUMENT: Luis
* File:preview.js
* Author:TODO:Luis 
* Date: 08/31/2022
* Description: Summary of what the code inside the file does 
-------------------------------------------------------------*/
import React, {useContext, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone'; 
import '../assets/css/Image.css' 
import ShopifyRequest from "../api/ShopifyRequest";    

function Previews(props, value) { 
  //const [image, setImage] = useState([]); 
  //const handleImageChange = (e) => setImage(e.target.files[0]); 
  

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
       /**
   * test
   *
   * @return  {[type]}  [return description]
   */
<<<<<<< HEAD
  const sendImages = async (e) => {
    try { 
      e.preventDefault();
=======
  const sendImage = async () => {
    try {
>>>>>>> 6d069bdb525ee21ee0491aa75fc457ebf4ad7c8e
      const imageData = new FormData();
      imageData.append("image", files); 
      console.log(files)
      const response = await ShopifyRequest.put(`/productVariant`, imageData, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
      
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
        <input {...getInputProps() } onChange={console.log("---")}/> 
        <p className='dragNdrop'>Drop File(s) {" "}</p>  
       
      <aside className='thumbsContainer'>
        {thumbs} 
        {!files[0] ? 'No File Chosen':files[0].name}
      </aside> 
      <div className='brightness'>   
      <img
          className="thumbnail image"
          src={props.value}
          alt="Add one?"
          /> 
          </div>  
        </div>   
      </> 
  );
} 
 
export default Previews;  