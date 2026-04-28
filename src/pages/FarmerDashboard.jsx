import { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';

export default function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });

    setSales(JSON.parse(localStorage.getItem('agriSales')) || []);
  }, []);

  const totalProducts = products.length;

  const totalSold = useMemo(
    () =>
      sales.length ||
      products.reduce((sum, product) => sum + (product.sold || 0), 0),
    [products, sales]
  );

  const totalProfit = useMemo(
    () =>
      sales.reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [sales]
  );

  return (
    <div className="page-shell">
      <Navbar role="farmer" />

      <main className="page-content">
        <section className="stats-grid">
          <div className="stat-card glass-card">
            <span>Total Products</span>
            <strong>{totalProducts}</strong>
          </div>

          <div className="stat-card glass-card">
            <span>Total Sold</span>
            <strong>{totalSold}</strong>
          </div>

          <div className="stat-card glass-card">
            <span>Total Profit</span>
            <strong>₹{totalProfit}</strong>
          </div>
        </section>

        <section className="glass-card table-card">
          <div className="table-head">
            <div>
              <span className="section-pill">Inventory</span>
              <h2>Product List</h2>
            </div>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Sold</th>
                </tr>
              </thead>

              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="table-empty">
                      No products found. Add your first product.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="table-image"
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>₹{product.price}</td>
                      <td>{product.quantity}</td>
                      <td>{product.sold || 0}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}