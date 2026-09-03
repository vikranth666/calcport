export default function ResetButton({ onReset }) {
  return (
    <button
      type="button"
      className="reset-button"
      onClick={onReset}
    >
      Reset
    </button>
  );
}