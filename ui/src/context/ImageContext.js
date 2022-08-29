import React, {useState,createContext, useEffect} from 'react'; 
import {useDropzone} from 'react-dropzone'; 
import '../assets/css/Image.css' 

/*
export const ImageContext = createContext(); 
export const ImageContextProvider = props => {
    
    return(
        <ImageContext.Provider value = {{files,setFiles,/*addFiles,*/ /*getRootProps, getInputProps, thumbs}}>
            {props.children}
        </ImageContext.Provider>
    )
} 
*/