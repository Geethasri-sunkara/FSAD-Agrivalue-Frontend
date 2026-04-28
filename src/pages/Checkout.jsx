import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({ name: '', address: '', phone: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('agriCart')) || [];
    setCart(cartItems);
  }, []);

  const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + Number(item.price), 0), [cart]);

  const updateFarmerStats = () => {
    const products = JSON.parse(localStorage.getItem('agriProducts')) || [];
    const sales = JSON.parse(localStorage.getItem('agriSales')) || [];

    const updatedProducts = [...products];
    cart.forEach((cartItem) => {
      const productIndex = updatedProducts.findIndex((product) => product.id === cartItem.id);
      if (productIndex !== -1) {
        updatedProducts[productIndex].sold = (updatedProducts[productIndex].sold || 0) + 1;
        updatedProducts[productIndex].quantity = Math.max((updatedProducts[productIndex].quantity || 0) - 1, 0);
      }
      sales.push({
        id: Date.now() + Math.random(),
        productName: cartItem.name,
        amount: Number(cartItem.price),
        purchasedAt: new Date().toISOString(),
      });
    });

    localStorage.setItem('agriProducts', JSON.stringify(updatedProducts));
    localStorage.setItem('agriSales', JSON.stringify(sales));
  };

  const handlePayment = () => {
    if (!form.name || !form.address || !form.phone) {
      alert('Please fill all checkout fields');
      return;
    }
    if (!cart.length) {
      alert('Your cart is empty');
      return;
    }

    const options = {
      key: 'rzp_test_123456789',
      amount: totalPrice * 100,
      currency: 'INR',
      name: 'Farmer AgriValue Connect',
      description: 'Test purchase',
      handler: function () {
        updateFarmerStats();
        localStorage.removeItem('agriCart');
        alert('Payment successful! Order placed.');
        navigate('/home');
      },
      prefill: {
        name: form.name,
        contact: form.phone,
      },
      notes: {
        address: form.address,
      },
      theme: {
        color: '#1f8f55',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="page-shell">
      <Navbar role="buyer" />
      <main className="page-content checkout-layout">
        <section className="checkout-form glass-card">
          <span className="section-pill">Checkout</span>
          <h2>Delivery details</h2>
          <div className="form-grid">
            <div>
              <label>Name</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter full name" />
            </div>
            <div>
              <label>Phone</label>
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Enter phone number" />
            </div>
            <div className="full-span">
              <label>Address</label>
              <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Enter delivery address" rows="5" />
            </div>
          </div>
          <button className="btn btn-primary btn-block" onClick={handlePayment}>Pay with Razorpay</button>
        </section>

        <aside className="checkout-summary glass-card">
          <h3>Payment summary</h3>
          <div className="summary-row"><span>Items</span><strong>{cart.length}</strong></div>
          <div className="summary-row"><span>Payable Amount</span><strong>₹{totalPrice}</strong></div>
          <p className="checkout-note">Test key configured: rzp_test_123456789</p>
        </aside>
      </main>
    </div>
  );
}
