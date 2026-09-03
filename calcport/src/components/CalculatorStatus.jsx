export default function CalculatorStatus({
  message,
}) {
  if (!message) {
    return null;
  }

  return (
    <p className="calculator-status">
      {message}
    </p>
  );
}