import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ role }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('agriRole');
    navigate('/');
  };

  return (
    <header className="navbar glass-card">
      <div className="brand-wrap">
        <div className="brand-logo" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 30C10 21.1634 17.1634 14 26 14H38C38 22.8366 30.8366 30 22 30H10Z" fill="currentColor" opacity="0.95"/>
            <path d="M10 34H38" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            <path d="M24 14C20 18 18 22.5 18 30" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <h1>Farmer AgriValue Connect</h1>
          <p>{role === 'buyer' ? 'Fresh produce marketplace' : 'Farmer business center'}</p>
        </div>
      </div>

      <nav className="nav-links">
        {role === 'buyer' ? (
          <>
            <Link to="/home">Home</Link>
            <Link to="/cart">Cart</Link>
          </>
        ) : (
          <>
            <Link to="/farmer-dashboard">Dashboard</Link>
            <Link to="/add-product">Add Product</Link>
          </>
        )}
        <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
}
