import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('agriCart')) || [];
    cart.push(product);
    localStorage.setItem('agriCart', JSON.stringify(cart));
    alert(`${product.name} added to cart`);
  };

  return (
    <div className="page-shell">
      <Navbar role="buyer" />

      <main className="page-content">
        <section className="hero-panel glass-card">
          <div>
            <span className="section-pill">Buyer Home</span>
            <h2>Browse trusted farm products</h2>
            <p>
              Compare prices, pick fresh produce, and complete checkout in a few clicks.
            </p>
          </div>

          <div className="hero-stats">
            <div>
              <strong>{products.length}</strong>
              <span>Products listed</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Local access</span>
            </div>

            <div>
              <strong>Fast</strong>
              <span>Checkout flow</span>
            </div>
          </div>
        </section>

        <section className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </section>
      </main>
    </div>
  );
}