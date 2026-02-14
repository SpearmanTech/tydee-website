import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // This line is crucial
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tydee: {
          indigo: "#4f46e5",
          magenta: "#ff00ff",
          proBlue: "#0000AA",
        },
      },
    },
  },
  plugins: [],
};
export default config;