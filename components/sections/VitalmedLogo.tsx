// reference/specs/vitalmed-logo.svg, verbatim — the "VITALMED" wordmark is
// vector letterforms in the original, not text (confirmed: a text search
// for "vitalmed" only ever matches the href URL, never visible text).
// Reused on the vitalmed case-study page's own Hero too, at a larger
// confirmed size (344x48 there vs this default) — same mark, same white
// fill, just scaled; this component's own viewBox differs in numeric
// precision from the Hero's inline copy but is confirmed the same logo
// (identical ~7.21 aspect ratio).
export default function VitalmedLogo({ height = 20 }: { height?: number }) {
  return (
    <svg viewBox="0 0 177.354 24.6" style={{ height, width: "auto" }} role="img" aria-label="Vitalmed">
      <path
        d="M 7.886 0 L 12.445 14.181 L 13.205 17.473 L 13.964 14.181 L 18.558 0.001 L 26.011 0.001 L 17.365 24.6 L 8.646 24.6 L 0 0 Z M 27.087 24.6 L 27.087 0 L 34.467 0 L 34.467 24.6 Z M 43.392 24.6 L 43.392 5.97 L 36.265 5.97 L 36.265 0 L 57.9 0 L 57.9 5.97 L 50.773 5.97 L 50.773 24.6 L 43.393 24.6 Z M 73.468 24.6 L 72.238 20.802 L 64.026 20.802 L 62.796 24.6 L 55.344 24.6 L 63.918 0 L 72.781 0 L 81.355 24.6 Z M 67.391 10.419 L 65.835 15.267 L 70.465 15.267 L 68.91 10.419 L 68.15 7.38 L 67.39 10.419 Z M 82.43 24.6 L 82.43 0 L 89.81 0 L 89.81 18.63 L 99.614 18.63 L 99.614 24.6 Z M 101.42 24.6 L 101.42 0 L 110.97 0 L 114.95 12.3 L 116.18 16.895 L 117.41 12.3 L 121.389 0 L 130.723 0 L 130.723 24.6 L 123.343 24.6 L 123.813 8.284 L 121.896 14.977 L 118.749 24.6 L 113.395 24.6 L 110.175 14.832 L 108.33 8.357 L 108.801 24.6 L 101.421 24.6 Z M 133.622 24.6 L 133.622 0 L 151.891 0 L 151.891 5.788 L 141.002 5.788 L 141.002 9.298 L 150.444 9.298 L 150.444 14.905 L 141.002 14.905 L 141.002 18.812 L 151.891 18.812 L 151.891 24.6 Z M 154.237 24.6 L 154.237 0 L 164.584 0 C 172.47 0 177.354 4.703 177.354 12.336 C 177.354 19.969 172.471 24.6 164.585 24.6 L 154.238 24.6 Z M 164.584 18.63 C 167.912 18.63 169.793 16.352 169.793 12.336 C 169.793 8.321 167.912 5.969 164.584 5.969 L 161.617 5.969 L 161.617 18.631 L 164.584 18.631 Z"
        fill="#ffffff"
      />
    </svg>
  );
}
