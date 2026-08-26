import { useState } from "react";

export default function FaqSection({
  faqs,
}) {

  const [openIndex, setOpenIndex] =
    useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(
      openIndex === index ? null : index
    );
  };

  return (
    <section className="faq-section">

      <h2>Frequently Asked Questions</h2>

      <div className="faq-list">

        {faqs.map((faq, index) => (

          <div
            className="faq-item"
            key={index}
          >

            <button
              className="faq-question"
              onClick={() =>
                toggleFaq(index)
              }
            >
              {faq.question}
            </button>

            {openIndex === index && (
              <div className="faq-answer">
                {faq.answer}
              </div>
            )}

          </div>

        ))}

      </div>

    </section>
  );
}