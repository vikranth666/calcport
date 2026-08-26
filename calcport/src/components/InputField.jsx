export default function InputField({
    label,
    value,
    onChange,
    placeholder,
  }) {
  
    return (
      <div className="input-group">
  
        <label>{label}</label>
  
        <input
          type="number"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
  
      </div>
    );
  }