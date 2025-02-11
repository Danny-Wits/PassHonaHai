import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Pass Hona Hai",
        short_name: "PHH",
        start_url: "/",
        display: "standalone",
        description: "Pass Hona Hai From Web to App",
        background_color: "#ffffff",
        theme_color: "#c029df",
        icons: [
          {
            src: "/icons/icon192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
