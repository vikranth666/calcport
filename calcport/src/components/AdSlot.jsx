export default function AdSlot({
  className = "",
}) {
  return (
    <div
      className={`ad-slot ${className}`}
      aria-label="Advertisement"
    >
      <span>Advertisement</span>
    </div>
  );
}