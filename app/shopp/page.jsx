"use client";
import ProductCard from '../components/ProductCard';
import { useEffect, useState } from 'react';
// import Spinner from '../../components/Spinner'; // Optional: Create a Spinner component

const Merchandise = () => {
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

  if (loading) return <p>loading...</p>; // Optional: Replace with your spinner component
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <main>
        <h1>Club Merchandise</h1>
        <section className="product-list">
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </section>
      </main>
      <style jsx>{`
        .product-list {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }
      `}</style>
    </>
  );
};

export default Merchandise;
