import React, {useContext, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone'; 
import '../assets/css/Image.css'  

function Previews(props, value) { 
  const [image, setImage] = useState([]); 
  const handleImageChange = (e) => setImage(e.target.files[0]); 
  

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
      
      const thumbs = files.map(file => (
        <div className='thumb' key={file.name}>
          <div className='thumbInner'>
            <img
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
        <input {...getInputProps() } onChange={(e) => handleImageChange(e)}/> 
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