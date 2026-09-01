// Generic decorative background pattern — used by Basalto and Lumine Gas.
// Both are real inline SVG data URIs in the source (a
// `data-framer-component-type="SVG"` element with
// `background-image:url('data:image/svg+xml,...')`), NOT separate hashed
// image files — there's nothing to resolve through f2c-sw.js here, the
// vector data is embedded directly in the page. Position/size/opacity are
// all confirmed values from the compiled CSS for each card's specific
// wrapper, not guessed.
export default function CardTexture({
  paths,
  viewBox,
  fill,
  width,
  height,
  bottom,
  right,
  opacity,
}: {
  paths: string[];
  viewBox: string;
  fill: string;
  width: number;
  height: number;
  bottom: number;
  right: number;
  opacity: number;
}) {
  return (
    <svg
      viewBox={viewBox}
      style={{ position: "absolute", bottom, right, width, height, opacity, zIndex: 0 }}
      aria-hidden
    >
      {paths.map((d) => (
        <path key={d} d={d} fill={fill} />
      ))}
    </svg>
  );
}
