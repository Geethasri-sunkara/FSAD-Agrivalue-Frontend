import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('agriCart')) || [];
    setCart(cartItems);
  }, []);

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
    localStorage.setItem('agriCart', JSON.stringify(updatedCart));
  };

  const totalPrice = useMemo(() => cart.reduce((total, item) => total + Number(item.price), 0), [cart]);

  return (
    <div className="page-shell">
      <Navbar role="buyer" />
      <main className="page-content">
        <section className="section-head glass-card compact-head">
          <div>
            <span className="section-pill">Cart</span>
            <h2>Review selected products</h2>
          </div>
          <div className="cart-total-box">
            <span>Total</span>
            <strong>₹{totalPrice}</strong>
          </div>
        </section>

        <section className="cart-layout">
          <div className="cart-items glass-card">
            {cart.length === 0 ? (
              <div className="empty-state">
                <h3>Your cart is empty</h3>
                <p>Add products from the buyer home page to continue.</p>
              </div>
            ) : (
              cart.map((item, index) => (
                <div className="cart-item" key={`${item.id}-${index}`}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>₹{item.price}</p>
                  </div>
                  <button className="btn btn-danger" onClick={() => removeFromCart(index)}>
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

          <aside className="order-summary glass-card">
            <h3>Order Summary</h3>
            <div className="summary-row"><span>Items</span><strong>{cart.length}</strong></div>
            <div className="summary-row"><span>Grand Total</span><strong>₹{totalPrice}</strong></div>
            <button className="btn btn-primary btn-block" disabled={!cart.length} onClick={() => navigate('/checkout')}>
              Checkout
            </button>
          </aside>
        </section>
      </main>
    </div>
  );
}
