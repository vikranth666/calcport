export default function CalculatorContainer({
  children,
  onSubmit,
}) {
  return (
    <form
      className="calculator-container"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.();
      }}
    >
      {children}
    </form>
  );
}