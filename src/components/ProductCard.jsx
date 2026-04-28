export default function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card glass-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" />
        <span className="tag">{product.quantity} kg available</span>
      </div>
      <div className="product-content">
        <div>
          <h3>{product.name}</h3>
          <p className="product-meta">Farm-fresh quality with transparent pricing.</p>
        </div>
        <div className="product-footer">
          <strong>₹{product.price}</strong>
          <button className="btn btn-primary" onClick={() => onAddToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
