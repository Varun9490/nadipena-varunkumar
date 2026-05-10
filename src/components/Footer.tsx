export default function Footer() {
  return (
    <footer
      className="py-8 text-center"
      style={{
        borderTop: '1px solid var(--border)',
        color: 'var(--text-tertiary)',
      }}
    >
      <div className="section-container">
        <p className="text-sm">
          © {new Date().getFullYear()} Nadipena Varunkumar · Built with Next.js
          & ❤️
        </p>
      </div>
    </footer>
  );
}
