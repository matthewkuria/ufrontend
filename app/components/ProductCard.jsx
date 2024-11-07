// components/ProductCard.js
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import { getCookie } from '../../utils/cookies';

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();
  

   if (!product) {
    return null; // Return null if the product is not defined
  }

  const handleAddToCart = () => {
    const isAuthenticated = getCookie('access_token'); // Adjust based on your auth method
    if (!isAuthenticated) {
      router.push('/login'); // Redirect to login if not authenticated
    } else {
      addToCart(product);
      alert(`${product.name} added to cart!`);
    }
  };
 
  

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">Ksh {product.price}</p>
      <div className="button-container">
        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button className={`favorite-button ${isFavorite ? 'favorited' : ''}`} onClick={handleToggleFavorite}>
          {isFavorite ? '❤️ Favorited' : '🤍 Favorite'}
        </button>
      </div>
      <style jsx>{`
        
      `}</style>
    </div>
  );
};

export default ProductCard;
