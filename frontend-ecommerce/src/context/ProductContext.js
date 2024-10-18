import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [prodsLoading, setProdsLoading] = useState(false)

    useEffect(() => {
        // Fetch all categories when the app loads
        setLoading(true);
        axios.get('https://fakestoreapi.com/products/categories')
            .then(response => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
                setLoading(false);
            });
    }, []);

    const addToCart = (product) => {
        setCartItems([...cartItems, product]);
    };

    return (
        <ProductContext.Provider value={{
            categories,
            setCategories,
            products,
            setProducts,
            cartItems,
            loading,
            setLoading,
            addToCart,
            prodsLoading,
            setProdsLoading
        }}>
            {children}
        </ProductContext.Provider>
    );
};
