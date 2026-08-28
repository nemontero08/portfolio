import PageReveal from "@/components/PageReveal";

export default function Home() {
  return (
    <main>
      <PageReveal>
        <div style={{ padding: "var(--space-7)" }}>
          <p style={{ fontSize: "var(--text-38)", fontWeight: "var(--font-weight-semibold)" }}>
            Hello, I&apos;m Nico
          </p>
          <p style={{ fontSize: "var(--text-16)", color: "var(--color-text-muted)" }}>
            Placeholder content — page-load reveal test.
          </p>
        </div>
      </PageReveal>
    </main>
  );
}
