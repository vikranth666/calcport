import Navbar from "./Navbar";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";

export default function CalculatorLayout({
  title,
  description,
  children,
}) {

  return (
    <>

      <Navbar />

      <main className="calculator-page">

      <Breadcrumbs currentPage={title} />
      

        <section className="calculator-header">


          <h1>{title}</h1>

          <p>{description}</p>

        </section>

        <section className="calculator-wrapper">

          {children}

        </section>

      </main>

      <Footer />

    </>
  );
}