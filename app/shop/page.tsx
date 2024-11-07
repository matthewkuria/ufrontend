"use client";
import { useCart } from "../context/CartContext"
import CardItem from "../components/card-item";
import Cart from "../cart/page";
import { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";
export default function Home() {
  const { cartItems } = useCart();
    // Check if the cart is empty
  const isEmpty = Object.keys(cartItems).length === 0;
  

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/shop/'); // Adjust to your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Could not load products. Please try again later.'); // More user-friendly error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return (
    <div className=" flex flex-col justify-center items-center min-h-96">
        <PropagateLoader
          color="#f20f0f"
          size={19}
          speedMultiplier={2}
        />
    </div>
  ); 
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 p-10 w-full bg-rose-100">
      <div className="">
        <h1 className="font-bold my-5 text-3xl">Club Merchandise</h1>
        <div className="md:max-w-md lg:max-w-3xl grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {/* Map through the data from the JSON file and return a  card for each item */}
            {products.map((item) => {
              return (
                <CardItem key={item.id} item={item} />
            )
          })}
        </div>
      </div>
      <div className="md:ml-56">      
          <Cart />        
      </div>
    </main>
  );
}
