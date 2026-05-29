export default function DecorativeFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-parchment">
      <div className="frame-border hidden lg:block" aria-hidden />
      <LeafBorder side="left" />
      <LeafBorder side="right" flip />

      <div className="frame-inner layout-transition relative z-[1] pb-6 pt-1">
        {children}
      </div>
    </div>
  );
}

function LeafBorder({ side, flip = false }: { side: "left" | "right"; flip?: boolean }) {
  return (
    <div
      className={`pointer-events-none absolute top-32 hidden h-[calc(100%-10rem)] w-5 opacity-50 lg:block ${
        side === "left" ? "left-1" : "right-1"
      } ${flip ? "scale-x-[-1]" : ""}`}
      aria-hidden
    >
      <svg viewBox="0 0 20 400" className="h-full w-full" preserveAspectRatio="none">
        <path
          d="M10 0 Q2 50 10 100 T10 200 T10 300 T10 400"
          stroke="#638C6D"
          strokeWidth="1.5"
          fill="none"
        />
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse
            key={i}
            cx={i % 2 === 0 ? 6 : 14}
            cy={40 + i * 48}
            rx="4"
            ry="7"
            fill="#7A9E7E"
            opacity="0.45"
            transform={`rotate(${i * 12} ${i % 2 === 0 ? 6 : 14} ${40 + i * 48})`}
          />
        ))}
      </svg>
    </div>
  );
}
