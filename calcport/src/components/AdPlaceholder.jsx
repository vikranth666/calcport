export default function AdPlaceholder({
  label = "Advertisement",
}) {
  return (
    <div
      className="ad-placeholder"
      aria-label={label}
    >
      <span>{label}</span>
    </div>
  );
}