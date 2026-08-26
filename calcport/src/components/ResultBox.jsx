export default function ResultBox({
    label,
    value,
  }) {
  
    return (
      <div className="result-box">
  
        <h3>{label}</h3>
  
        <p>{value}</p>
  
      </div>
    );
  }