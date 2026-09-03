export default function InputField({
  label,
  value,
  onChange,
  placeholder,
  min = 0,
  step = "any",
  error = "",
}) {
  const inputId = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  return (
    <div className="input-group">
      <label htmlFor={inputId}>
        {label}
      </label>

      <input
        id={inputId}
        type="number"
        min={min}
        step={step}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? `${inputId}-error` : undefined
        }
      />

      {error && (
        <p
          id={`${inputId}-error`}
          className="input-error"
        >
          {error}
        </p>
      )}
    </div>
  );
}