import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import NavBar from '../components/structure/NavBar' 

import invoiceDoc from '../dowloadableFiles/ReadMeFile.pdf'

//TODO put actual documentation
//Holds the documentation for the website itself such as how to use it 
//and holds documentation for other relevent apps such as infor macros 
let inforInvoicesDescription = 'Version 1.0.0' 
let inforDoc = invoiceDoc
const Documentation = () => {  
  return (   
    <div>
      <NavBar/> 
      <Container> 
        <h1 style={{textAlign: "center", fontSize: '40px'}}>Welcome to Documentation</h1> 
        <p style={{ textAlign: "center" }}>Scroll to find your Application</p>
        <div className="box">
              <h2 style={{ textAlign: "left", marginLeft: '.2rem' }}>Infor Invoices</h2>
              <p style={{ textAlign: "left", marginLeft: '.2rem' }}>{inforInvoicesDescription}</p> 
              <a href={inforDoc} download={inforDoc}><button
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