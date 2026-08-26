const categories = [
    "Finance",
    "Health",
    "Math",
    "Utility",
    "Converters",
  ];
  
  export default function CategorySection() {
    return (
      <section className="category-section">
  
        <div className="section-header">
          <h2>Browse Categories</h2>
  
          <p>
            Explore calculators by category.
          </p>
        </div>
  
        <div className="category-grid">
  
          {categories.map((category, index) => (
            <div className="category-card" key={index}>
              {category}
            </div>
          ))}
  
        </div>
  
      </section>
    );
  }