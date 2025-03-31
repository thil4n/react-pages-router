import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import GlobPlugin from "vite-plugin-glob";

export default defineConfig({
    server: {
        port: 4000,
    },
    plugins: [react(), GlobPlugin()],
    resolve: {
        alias: {
            "@components": path.resolve(__dirname, "src/components"),
            "@utils": path.resolve(__dirname, "src/utils"),
            "@meta": path.resolve(__dirname, "src/meta"),
            "@services": path.resolve(__dirname, "src/services"),
            "@hooks": path.resolve(__dirname, "src/hooks"),
            "@assets": path.resolve(__dirname, "src/assets"),
            "@config": path.resolve(__dirname, "src/config"),
            "@validations": path.resolve(__dirname, "src/validations"),
            "@interfaces": path.resolve(__dirname, "src/interfaces"),
        },
    },
});
