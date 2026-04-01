export function LanguageSwitcher({ lang, onToggle, label }) {
  return (
    <button
      className="language-switcher"
      type="button"
      onClick={onToggle}
      aria-label={label}
    >
      <span className="language-switcher__current">{lang.toUpperCase()}</span>
      <span className="language-switcher__divider" />
      <span className="language-switcher__next">{label}</span>
    </button>
  );
}
