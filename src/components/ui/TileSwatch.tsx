"use client";

interface TileSwatchProps {
  patternClass: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  selected?: boolean;
  title?: string;
}

const sizeMap = {
  xs: "h-6 w-6",
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
};

export default function TileSwatch({
  patternClass,
  size = "md",
  className = "",
  onClick,
  selected = false,
  title,
}: TileSwatchProps) {
  const Component = onClick ? "button" : "div";

  return (
    <Component
      type={onClick ? "button" : undefined}
      onClick={onClick}
      title={title}
      className={`tile-swatch ${patternClass} ${sizeMap[size]} shrink-0 transition-transform ${
        onClick ? "cursor-pointer hover:scale-105 active:scale-95" : ""
      } ${selected ? "ring-2 ring-navy ring-offset-1" : ""} ${className}`}
      aria-label={title}
    />
  );
}
