import React from 'react'
import Home from './routes/Home';
import ProductDetails from './routes/ProductDetails';
import UpdateProducts from './routes/UpdateProducts';

import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { ProductsContextProvider } from './context/ProductsContext';
import OrderPage from './routes/OrderPage';
import { OrdersContextProvider } from './context/OrdersContext';

const App = ()=> {
    return(
        <ProductsContextProvider>
            <OrdersContextProvider>
                <div className='container'> 
                    <Router>
                        <Routes>
                            <Route exact path ="/" element = {<Home/>}/>
                            <Route exact path ="/products/:id/update" element = {<UpdateProducts/>}/>
                            <Route exact path ="/products/:id" element = {<ProductDetails/>}/>
                            <Route path='/orders' element={<OrderPage/>} />
                        </Routes>
                
                    </Router>
                </div>
            </OrdersContextProvider>
        </ProductsContextProvider>
    )
    
}
export default App  