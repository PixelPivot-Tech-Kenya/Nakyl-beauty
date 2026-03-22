

export default function Logo() {
  return (
    <div className="flex items-center gap-2 select-none">
      {/* Gold accent mark */}
      <span
        style={{
          display: "block",
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "var(--gold)",
          boxShadow: "0 0 0 1.5px color-mix(in srgb, var(--gold) 30%, transparent)",
          flexShrink: 0,
        }}
      />

      {/* Wordmark */}
      <span
        style={{
          fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: "1.35rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--burgundy)",
          lineHeight: 1,
          paddingTop: "0.05em", /* optical baseline alignment */
        }}
      >
        Nakyl
      </span>
    </div>
  );
}