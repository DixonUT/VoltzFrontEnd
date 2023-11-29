import React, { createContext, useContext, useState, useEffect } from 'react';

const serverhost = import.meta.env.VITE_SERVERHOST;
const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);
export const ProductProvider = ({ children }) => {
    const [productList , setProducts] = useState([]);
    useEffect(() => { 
        async function getproducts (){
            const response = await fetch (`${serverhost}//api/products`);
            const proudcts = await response.json ();
            setProducts (proudcts)
        }
getproducts();
    }, []);
    return (
        <ProductContext.Provider value={{ productList}}>
            {children}
        </ProductContext.Provider>
    );
}
   




