import React, {useState,createContext} from 'react';


export const OrdersContext = React.createContext();

export const OrdersContextProvider = props => {

    const [orders,setOrders] = useState([]);

    const addOrder = (order) =>{
        setOrders([...orders,order]);
    };  
    
    return(
        <OrdersContext.Provider value = {{orders,setOrders,addOrder}}>
            {props.children}
        </OrdersContext.Provider>
    )

}
