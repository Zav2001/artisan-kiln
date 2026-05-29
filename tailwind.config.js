/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#F5F1E6",
        parchmentDark: "#EBE4D4",
        navy: "#3B4D71",
        navyDark: "#2D3A56",
        terracotta: "#C06C4D",
        terracottaDark: "#B36A5E",
        sage: "#638C6D",
        sageLight: "#7A9E7E",
        mustard: "#D9A04B",
        tan: "#E5D3B3",
        tanDark: "#D4C4A8",
        ink: "#1A1A1A",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        condensed: ["var(--font-barlow-condensed)", "sans-serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      spacing: {
        section: "clamp(0.75rem, 2vw, 1.25rem)",
      },
      fontSize: {
        "label-sm": "clamp(0.55rem, 1.2vw, 0.65rem)",
        "label-md": "clamp(0.6rem, 1.4vw, 0.7rem)",
      },
      boxShadow: {
        sketch: "2px 2px 0px 0px rgba(26,26,26,0.12)",
      },
      screens: {
        desktop: "1024px",
      },
      transitionDuration: {
        layout: "350ms",
      },
    },
  },
  plugins: [],
};
