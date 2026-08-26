export default function InfoSection({
    title,
    children,
  }) {
  
    return (
      <section className="info-section">
  
        <h2>{title}</h2>
  
        <div className="info-content">
          {children}
        </div>
  
      </section>
    );
  }