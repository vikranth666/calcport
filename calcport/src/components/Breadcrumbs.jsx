import { Link } from "react-router-dom";

export default function Breadcrumbs({
  currentPage,
}) {

  return (
    <div className="breadcrumbs">

      <Link to="/">Home</Link>

      <span>/</span>

      <span>{currentPage}</span>

    </div>
  );
}