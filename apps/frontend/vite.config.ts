import reactPlugin from "@vitejs/plugin-react";
import browserslist from "browserslist";
import { browserslistToTargets, Features } from "lightningcss";
import { fileURLToPath } from "node:url";
import { type ConfigEnv, defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

const config = ({ mode }: ConfigEnv): ReturnType<typeof defineConfig> => {
	const {
		VITE_APP_API_ORIGIN_URL,
		VITE_APP_DEVELOPMENT_PORT,
		VITE_APP_PROXY_SERVER_URL,
	} = loadEnv(mode, process.cwd());

	return defineConfig({
		build: {
			cssMinify: "lightningcss",
			outDir: "build",
		},
		css: {
			lightningcss: {
				drafts: {
					customMedia: true,
				},
				include: Features.MediaQueries,
				targets: browserslistToTargets(
					browserslist(["last 2 version", "not dead"]),
				),
			},
			transformer: "lightningcss",
		},
		plugins: [
			reactPlugin(),
			svgr(),
			VitePWA({
				registerType: "autoUpdate",
				includeAssets: ["favicon.svg", "apple-touch-icon.png"],
				manifest: {
					name: "SmartScapes",
					short_name: "SmartScapes",
					description:
						"Interactive mapping platform for exploring large, complex areas",
					theme_color: "#ffffff",
					background_color: "#ffffff",
					scope: "/",
					start_url: "/",
					icons: [
						{
							src: "/assets/images/pwa-192x192.png",
							sizes: "192x192",
							type: "image/png",
						},
						{
							src: "/assets/images/pwa-512x512.png",
							sizes: "512x512",
							type: "images/png",
						},
						{
							src: "/assets/images/pwa-512x512.png",
							sizes: "512x512",
							type: "image/png",
							purpose: "any",
						},
						{
							src: "/assets/images/pwa-512x512.png",
							sizes: "512x512",
							type: "image/png",
							purpose: "maskable",
						},
					],
				},
				workbox: {
					globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
				},
				devOptions: {
					enabled: true,
				},
			}),
		],
		resolve: {
			alias: [
				{
					find: "~",
					replacement: fileURLToPath(new URL("src", import.meta.url)),
				},
			],
		},
		server: {
			port: Number(VITE_APP_DEVELOPMENT_PORT),
			proxy: {
				[VITE_APP_API_ORIGIN_URL as string]: {
					changeOrigin: true,
					target: VITE_APP_PROXY_SERVER_URL,
				},
			},
		},
	});
};

export default config;
