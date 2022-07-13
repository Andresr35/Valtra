import React from 'react'
import Home from './routes/Home';
import ProductDetails from './routes/ProductDetails';
import UpdateProducts from './routes/UpdateProducts';

import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { ProductsContextProvider } from './context/ProductsContext';
import OrderPage from './routes/OrderPage';
import { OrdersContextProvider } from './context/OrdersContext';
import FulfillingOrders from './routes/FulfillingOrders'; 

//authentication 
import { AuthenticatedTemplate, UnauthenticatedTemplate} from "@azure/msal-react"; 

//more pages 
import SignInPage from './routes/SignInPage';  

//version num
const App = ()=> {  
    return( 
        <React.StrictMode> 
            <AuthenticatedTemplate>
                <ProductsContextProvider>
                    <OrdersContextProvider> 
                            <Router>
                                <Routes>
                                    <Route exact path ="/" element = {<Home/>}/>
                                    <Route exact path ="/products/:id/update" element = {<UpdateProducts/>}/>
                                    <Route exact path ="/products/:id" element = {<ProductDetails/>}/>
                                    <Route path='/orders' element={<OrderPage/>} />
                                    <Route path = '/fulfill' element={<FulfillingOrders/>}/>
                                </Routes>
                            </Router>
                    </OrdersContextProvider>
                </ProductsContextProvider> 
            </AuthenticatedTemplate> 

            <UnauthenticatedTemplate>
                <Router> 
                    <Routes>
                        <Route exact path = "/" element = {<SignInPage/>}/>  
                        <Route exact path = "/products/:id/update" element = {<SignInPage/>}/>  
                        <Route exact path = "//products/:id" element = {<SignInPage/>}/>  
                        <Route path='/orders' element={<SignInPage/>} />
                        <Route path = '/fulfill' element={<SignInPage/>}/>
                    </Routes>
                </Router>   
            </UnauthenticatedTemplate>
        </React.StrictMode>

    );
    
}
export default App  