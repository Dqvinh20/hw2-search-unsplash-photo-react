import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/hw2-search-unsplash-photo-react",
  plugins: [react()],
});
