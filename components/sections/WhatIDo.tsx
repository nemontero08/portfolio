import styles from "./WhatIDo.module.css";

const ITEMS = [
  {
    title: "Product Design",
    description:
      "I design digital products combining strategy, user experience, metrics and business to create products that grow and scale.",
  },
  {
    title: "UX/UI Design",
    description:
      "I design digital products end to end, combining business, users and technology to create scalable, high-impact solutions.",
  },
  {
    title: "Design Systems",
    description:
      "I build scalable design systems with components, tokens, and documentation to maintain consistency and speed across digital products.",
  },
  {
    title: "Web & Framer",
    description:
      "I design and develop fast, responsive websites and landing pages using Framer and no-code tools.",
  },
  {
    title: "Branding & visual identity",
    description: "I design visual identities, brand systems, and digital assets for products and companies.",
  },
  {
    title: "Illustration",
    description: "I create custom illustrations and iconography for interfaces, brands, and digital products.",
  },
];

// Slider arrows are hidden by default in the original (shown on hover/scroll
// interaction) — that behavior comes later. Static horizontal-scroll list
// for now.
export default function WhatIDo() {
  return (
    <div className={styles.card}>
      <h5 className={styles.eyebrow}>WHAT I DO</h5>
      <ul className={styles.list}>
        {ITEMS.map((item) => (
          <li className={styles.item} key={item.title}>
            <h4 className={styles.itemTitle}>{item.title}</h4>
            <h5 className={styles.itemDescription}>{item.description}</h5>
          </li>
        ))}
      </ul>
    </div>
  );
}
