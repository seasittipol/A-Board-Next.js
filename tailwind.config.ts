import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        major: "#243831",
        minor: "#2B5F44",
        subgreen: "#D8E9E4",
        success: "#49A569",
        golden: "#C5A365",
        grey300: "#939494",
        grey100: "#BBC2C0",
      },
    },
  },
  plugins: [],
};
export default config;
