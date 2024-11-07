"use client";
import { createContext, useState, useContext } from 'react';
// Create the context
const CartContext = createContext();
// Create a provider component
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
  const addToCart = (item) => {
        setCartItems((prevCartItems) => {
            if (prevCartItems[item.id]) {
                return {
                    ...prevCartItems,
                    [item.id]: {
                        ...prevCartItems[item.id],
                        quantity: prevCartItems[item.id].quantity + 1
                    }
                };
            } else {
                return {
                    ...prevCartItems,
                    [item.id]: {
                        ...item,
                        quantity: 1
                    }
                };
            }
        });
    };

    const increaseQuantity = (productId) => {
        setCartItems((prevCartItems) => ({
            ...prevCartItems,
            [productId]: {
                ...prevCartItems[productId],
                quantity: prevCartItems[productId].quantity + 1
            }
        }));
    };

    const decreaseQuantity = (productId) => {
        setCartItems((prevCartItems) => {
            const updatedItems = { ...prevCartItems };
            if (updatedItems[productId].quantity > 1) {
                updatedItems[productId].quantity -= 1;
            } else {
                delete updatedItems[productId];
            }
            return updatedItems;
        });
    };

   const removeFromCart = (productId) => {
        setCartItems((prevCartItems) => {
            const updatedItems = { ...prevCartItems };
            delete updatedItems[productId];
            return updatedItems;
        });
    };

    

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, increaseQuantity,  decreaseQuantity}}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the CartContext
export const useCart = () => {
    return useContext(CartContext);
};
