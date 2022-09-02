/*------------------------------------------------------------- 
____________________//#TODO: Document LUIS
* File: Downloads.jsx 
* Author: TODO:Luis 
* Date: 8/31/2022   
* Description: This file conatins the code for the Downloads 
* page, which is a route displaying a box for every available 
* downloadable item, which conatins a title, description, and 
* downlaod button for each item. These page requires  
* authentication: in the future TODO: it should be aimed to 
* keep downable items in a conatiner and allow downlaods to 
* occur through varified fetch requests      
-------------------------------------------------------------*/
import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import NavBar from '../components/structure/NavBar' 
import { useNavigate } from "react-router-dom"; 

//downloadable Files
import ValtraImg from '../dowloadableFiles/valtra_logo.gif'  
import testZip from '../dowloadableFiles/Testzip.zip' 
import inforInvoices from '../dowloadableFiles/Testzip.zip'//'../dowloadableFiles/shopify_InForOrders (2).zip' 

//Descriptions & duplicate assignmnets  
const ValtraImgDescription = '.gif file of Valtra.inc logo';  
const testZipDescription = 'Test zip folder with .txt File';
const inforInvoicesDescription = 'Version 1.0.0 '; 
const inforOrders = testZip;  
const inforOrdersDescription = 'Version 1.0.0'; 
const ApiValtraImg = ValtraImg; 
const ApiValtraImgDescription = 'For Api testing';   

const Downloads = () => {  

  let navigate = useNavigate();
  const goToDocum = () => {
  navigate(`../Documentation`); 
  }
//#TODO: all these boxes have the same format but different contents, either 
// items box into a whole table or make another conainter/ import feature 
// but this code is far to redundant
  return (  
    <>
    <div>
      <NavBar/> 
      <Container>
        <h1 style={{textAlign: "center", fontSize: '40px'}}>Welcome to Downloads</h1> 
        <p style={{ textAlign: "center" }}>Scroll to find your Application</p>
      </Container>
      <Container>
          <div className="box">
            <h2 style={{ textAlign: "left", marginLeft: '.2rem' }}>Infor Invoices</h2>
            <p style={{ textAlign: "left", marginLeft: '.2rem' }}>{inforInvoicesDescription}</p> 
            <a href={inforInvoices} download={inforInvoices}><button
              type="button"  
              style = {{marginLeft: '.5rem', marginRight: '.7rem', marginTop: '.5rem'}}
              className="btn btn-primary"> 
              Download
            </button></a>  
            <button
              type="button" 
              style = {{marginLeft: '.5rem', marginRight: '.7rem', marginTop: '.5rem'}}
              className="btn btn-outline-secondary" onClick={() => goToDocum()}>
              See Documentation
            </button > 
          </div>  

          <div className="box">
            <h2 style={{ textAlign: "left", marginLeft: '.2rem' }}>Infor Orders</h2>
            <p style={{ textAlign: "left", marginLeft: '.2rem' }}>{inforOrdersDescription}</p> 
            <a href={inforOrders} download={inforOrders}><button
              type="button"  
              style = {{marginLeft: '.5rem', marginRight: '.7rem', marginTop: '.5rem'}}
              className="btn btn-primary"> 
              Download
            </button ></a>  
            <button
              type="button" 
              style = {{marginLeft: '.5rem', marginRight: '.7rem', marginTop: '.5rem'}}
              className="btn btn-outline-secondary" onClick={() => goToDocum()}>
              See Documentation
            </button > 
          </div>  

          <div className="box">
            <h2 style={{ textAlign: "left", marginLeft: '.2rem' }}>API Valtra IMAGE</h2>
            <p style={{ textAlign: "left", marginLeft: '.2rem' }}>{ApiValtraImgDescription}</p> 
            <a href={ApiValtraImg} download={ApiValtraImg}><button
              type="button"  
              style = {{marginLeft: '.5rem', marginRight: '.7rem', marginTop: '.5rem'}}
              className="btn btn-primary"> 
              Download
            </button ></a>  
            <button
              type="button" 
              style = {{marginLeft: '.5rem', marginRight: '.7rem', marginTCSop: '.5rem'}}
              className="btn btn-outline-secondary" onClick={() => goToDocum()}>
              See Documentation
            </button > 
          </div> 
        <div className="title">
          <div className="box">
            <h2 style={{ textAlign: "left", marginLeft: '.2rem' }}>Valtra Image</h2>
            <p style={{ textAlign: "left", marginLeft: '.2rem' }}>{ValtraImgDescription}</p> 
            <a href={ValtraImg} download={ValtraImg}><button
              type="button"  
              style = {{marginLeft: '.5rem', marginRight: '.7rem', marginTop: '.5rem'}}
              className="btn btn-primary"> 
              Download
            </button ></a>  
            <button
              type="button" 
              style = {{marginLeft: '.5rem', marginRight: '.7rem', marginTop: '.5rem'}}
              className="btn btn-outline-secondary" onClick={() => goToDocum()}>
              See Documentation
            </button> 
          </div> 

          <div className="box">
            <h2 style={{ textAlign: "left", marginLeft: '.2rem' }}>Test</h2>
            <p style={{ textAlign: "left", marginLeft: '.2rem' }}>{testZipDescription}</p> 
            <a href={testZip} download={testZip}><button
              type="button"  
              style = {{marginLeft: '.5rem', marginRight: '.7rem', marginTop: '.5rem'}}
              className="btn btn-primary"> 
              Download
            </button></a>  
            <button
              type="button" 
              style = {{marginLeft: '.5rem', marginRight: '.7rem', marginTop: '.5rem'}}
              className="btn btn-outline-secondary" onClick={() => goToDocum()}>
              See Documentation
            </button> 
          </div>  

        </div>
      </Container>
    </div></>
  )
}

export default Downloads