// src/components/Accordion/Accordion.jsx
import { useState } from "react";
import AccordionCard from "./AccordionCard";
import { FiArrowUpRight } from "react-icons/fi";

const faqs = [
  {
    q: "How does this posture corrector work?",
    a: "It supports and gently aligns your shoulders, back, and spine so you maintain neutral posture throughout the day, reducing strain from slouching."
  },
  {
    q: "Is it suitable for all ages and body types?",
    a: "Yep. The adjustable straps fit most body types and ages. For kids or medical conditions, check with a clinician first."
  },
  {
    q: "Does it really help with back pain and posture improvement?",
    a: "Consistent use can reduce muscle fatigue and remind you to sit/stand upright. Best results happen alongside mobility and strengthening exercises."
  },
  {
    q: "Does it have smart features like vibration alerts?",
    a: "The smart variant buzzes when you slouch past a set angle. Standard version is non-electronic."
  },
  {
    q: "Can I wear it under clothes?",
    a: "Yes—low-profile design sits under most tops without bulk. Choose the right size for comfort."
  },
  {
    q: "How long should I wear it per day?",
    a: "Start with 20–30 minutes and build up to 1–3 hours. It’s a trainer, not a crutch—your muscles still need to work."
  },
  {
    q: "Will it restrict movement?",
    a: "No. It guides alignment while allowing natural range of motion for daily activities."
  },
  {
    q: "How do I choose the right size?",
    a: "Measure your chest/shoulder width and match the size chart on the product page. When between sizes, size up for comfort."
  },
  {
    q: "How do I clean and care for it?",
    a: "Hand-wash with mild soap, air-dry flat. Avoid bleach, heat drying, or ironing to preserve elasticity."
  },
  {
    q: "What’s the return or warranty policy?",
    a: "30-day hassle-free returns on unused items and a limited warranty against manufacturing defects."
  }
];

export default function Accordion() {
  const [showAll, setShowAll] = useState(false);
  const initialVisible = 5; // how many to show before "See More"
  const items = showAll ? faqs : faqs.slice(0, initialVisible);

  return (
    <div className="bg-base-200">
      <div className="max-w-5xl mx-auto px-4 py-14">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center">
          Frequently Asked Questions (FAQ)
        </h2>
        <p className="text-base-content/70 text-center max-w-3xl mx-auto mt-3">
          Everything you actually care about, answered straight up.
        </p>

        {/* Accordion stack */}
        <div className="mt-10 join join-vertical w-full rounded-box">
          {items.map((item, i) => (
            <AccordionCard
              key={item.q}
              name="faq-accordion"            // single-open group
              q={item.q}
              a={item.a}
              defaultChecked={!showAll ? i === 0 : false} // open first when collapsed
            />
          ))}
        </div>

        {/* See more / See less */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="btn btn-accent btn-md gap-2"
          >
            {showAll ? "See Less" : "See More FAQ’s"}
            <FiArrowUpRight
              className={`text-lg transition-transform ${showAll ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
