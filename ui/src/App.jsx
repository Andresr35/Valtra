/*------------------------------------------------------------- 
____________________//#TODO: Document ANDRES
* File: App.jsx  
* Author: Andres
* Date: 8/31/2022  
* Description: 
-------------------------------------------------------------*/
import React from "react";
import Home from "./routes/Home";
import UpdateProducts from "./routes/UpdateProducts";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductsContextProvider } from "./context/ProductsContext";
import OrderPage from "./routes/OrderPage";
import { OrdersContextProvider } from "./context/OrdersContext";
import FulfillingOrders from "./routes/FulfillingOrders";
import { VariantsContextProvider } from "./context/VariantsContext"; 
//import { ImageContextProvider } from "./context/ImageContext";

//authentication
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

//more pages
import SignInPage from "./routes/SignInPage";
import ShopifyProducts from "./routes/ShopifyProducts";
import Variants from "./routes/Variants";
import SignOutPage from "./routes/SignOut"; 
import Downloads from "./routes/Downloads";
import Documentation from "./routes/Documentation";
import DocumentationRestricted from "./routes/DocumentationRestricted"; 
import Updates from"./routes/Updates";

//version num
const App = () => { 

  return ( 
    <React.StrictMode>
      <AuthenticatedTemplate>  
      <VariantsContextProvider>
        <ProductsContextProvider>
          <OrdersContextProvider>  
        
            <Router>
              <Routes> 
                <Route exact path="/" element={<Home />} /> 
                <Route
                  exact
                  path="/products/gid://shopify/Product/:id/update"
                  element={<UpdateProducts />}
                />
                <Route path="/orders" element={<OrderPage />} />
                <Route path="/fulfill" element={<FulfillingOrders />} />
                <Route path='/products' element={<ShopifyProducts/>}/> 
                <Route path="/downloads" element={<Downloads/>} />
                <Route path="/documentation" element={<Documentation/>} />
                <Route path="/product/gid://shopify/Product/:id" element={<Variants/>}/> 
                <Route path="/updates" element={<Updates/>} />
                </Routes>
              </Router>
             
          </OrdersContextProvider>
        </ProductsContextProvider>
        </VariantsContextProvider>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Router>
          <Routes>
            <Route exact path="/" element={<SignInPage />} />
            <Route exact path="/products/:id/update" element={<SignOutPage/>} />
            <Route exact path="/products/:id" element={<SignOutPage/>} />
            <Route path="/orders" element={<SignOutPage />} /> 
            <Route path="/products" element={<SignOutPage />} />
            <Route path="/fulfill" element={<SignOutPage />} />  
            <Route path = "/SignedOut" element = {<SignOutPage/>}/> 
            <Route path="/downloads" element={<SignOutPage/>} />
            <Route path="/documentation" element={<DocumentationRestricted/>} />
          </Routes>
        </Router>
      </UnauthenticatedTemplate>
    </React.StrictMode>
  ); 
}; 

export default App;
//Documentation for file headers 

/*------------------------------------------------------------- 
* File: Name of file
* Author:TODO:Who wrote the documentation 
* Date: day of which documentation was last updated
* Description: Summary of what the code inside the file does 
-------------------------------------------------------------*/