export function SectionHeading({ kicker, text, title }) {
  return (
    <div className="section-heading" data-reveal>
      <span className="section-heading__kicker">{kicker}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}
