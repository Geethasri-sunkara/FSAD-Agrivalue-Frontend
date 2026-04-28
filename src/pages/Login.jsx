import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [role, setRole] = useState('buyer');
  const navigate = useNavigate();

  useEffect(() => {
    const savedRole = localStorage.getItem('agriRole');
    if (savedRole === 'buyer') navigate('/home');
    if (savedRole === 'farmer') navigate('/farmer-dashboard');
  }, [navigate]);

  const handleLogin = () => {
    localStorage.setItem('agriRole', role);
    navigate(role === 'buyer' ? '/home' : '/farmer-dashboard');
  };

  return (
    <main className="login-page">
      <section className="login-visual">
        <div className="overlay"></div>
        <div className="visual-content">
          <span className="eyebrow">Agri Commerce Platform</span>
          <h1>Connect farmers directly with serious buyers.</h1>
          <p>
            A clean marketplace experience for product discovery, sales tracking, and simple digital checkout.
          </p>
        </div>
      </section>

      <section className="login-panel">
        <div className="login-card glass-card">
          <span className="section-pill">Secure access</span>
          <h2>Welcome back</h2>
          <p>Select your role to enter the platform dashboard.</p>

          <label htmlFor="role">Choose Role</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="buyer">Buyer</option>
            <option value="farmer">Farmer</option>
          </select>

          <button className="btn btn-primary btn-block" onClick={handleLogin}>
            Login
          </button>
        </div>
      </section>
    </main>
  );
}
