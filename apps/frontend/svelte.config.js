import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";
import { windi } from "svelte-windicss-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [preprocess(), windi()],

  kit: {
    adapter: adapter(),
    vite: {
      server: {
        proxy: {
          "/api": {
            target: "http://localhost:3001/",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ""),
          },
        },
      },
    },
  },
};

export default config;
