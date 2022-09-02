/*------------------------------------------------------------- 
* File: Documentation.jsx  
* Author: TODO:Luis
* Date: 8/31/2022  
* Description: Web routes containing boxes for any application
* or downloadable item present in Downloads.jsx (or other misc 
* items). In each box the item is labled, given a description 
* which is typically the version number of said item, as 
* well as a button in which the user can click to download 
* the documentation for an item  
-------------------------------------------------------------*/ 
//Libraires 
import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import NavBar from '../components/structure/NavBar' 

//Documentation Files 
import invoiceDoc from '../dowloadableFiles/ReadMeFile.pdf' 

//Description texts
let inforInvoicesDescription = 'Version 1.0.0'  

const Documentation = () => {  
  return (   
    <div>
      <NavBar/> 
      <Container> 
        <h1 style={{textAlign: "center", fontSize: '40px'}}>Welcome to Documentation</h1> 
        <p style={{textAlign: "center"}}>Scroll to find your Application</p>
        <div className="box">
              <h2 style={{ textAlign: "left", marginLeft: '.2rem' }}>Infor Invoices</h2>
              <p style={{ textAlign: "left", marginLeft: '.2rem' }}>{inforInvoicesDescription}</p> 
              <a href={invoiceDoc} download={invoiceDoc}><button
                type="button"  
                style = {{marginLeft: '.5rem', marginRight: '.7rem', marginTop: '.5rem'}}
                className="btn btn-primary"> 
                Download Documentation
              </button></a>  
          </div>
      </Container>
    </div>
  )
}

export default Documentation