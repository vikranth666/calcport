export default function CalculateButton({
  children = "Calculate",
  onClick,
}) {
  return (
    <button
      type="button"
      className="calculate-button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}