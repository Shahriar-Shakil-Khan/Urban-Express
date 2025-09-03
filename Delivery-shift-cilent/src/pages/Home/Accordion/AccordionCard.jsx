// src/components/Accordion/AccordionCard.jsx
export default function AccordionCard({ name, q, a, defaultChecked = false }) {
  return (
    <div className="collapse collapse-arrow join-item border border-base-300 bg-base-100">
      <input type="radio" name={name} defaultChecked={defaultChecked} />
      <div className="collapse-title text-base md:text-lg font-semibold">
        {q}
      </div>
      <div className="collapse-content">
        <p className="text-base-content/70">{a}</p>
      </div>
    </div>
  );
}
