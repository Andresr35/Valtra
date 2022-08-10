import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import NavBar from '../components/structure/NavBar' 
 
import Photo from '../dowloadableFiles/valtra_logo.gif'  
import zip from '../dowloadableFiles/Testzip.zip' 
import inforInvoicesZip from '../dowloadableFiles/Testzip.zip'//'../dowloadableFiles/shopify_InForOrders (2).zip'
//TODO actaully app conent that can be downloaded 
//Allows users to have a centalized place to 
//downlaod content such as infor apps  
import { useEffect } from 'react'
import {useState} from 'react' 
import { useNavigate } from "react-router-dom";

//Downloads---------------------------------------- 
const ValtraImg = Photo; 
const ValtraImgDescription = '.gif file of Valtra.inc logo'; 
const testZip = zip; 
const testZipDescription = 'Test zip folder with .txt File';

const inforInvoices = inforInvoicesZip;
const inforInvoicesDescription = 'Version 1.0.0 '; 
const inforOrders = zip;  
const inforOrdersDescription = 'Version 1.0.0'; 

const ApiValtraImg = Photo; 
const ApiValtraImgDescription = 'For Api testing';   

const Downloads = () => {  

  let navigate = useNavigate();
  const goToDocum = () => {
  navigate(`../Documentation`); 
  }

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