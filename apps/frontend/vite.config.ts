import reactPlugin from "@vitejs/plugin-react";
import browserslist from "browserslist";
import { browserslistToTargets, Features } from "lightningcss";
import { fileURLToPath } from "node:url";
import { type ConfigEnv, defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";

const BYTES_IN_KB = 1024;
const BYTES_IN_MB = BYTES_IN_KB * BYTES_IN_KB;
const MAX_FILE_CACHE_SIZE_MB = 3.5;

const CACHE_DURATION_DAYS = {
	FONTS: 365,
	IMAGES: 7,
} as const;

const CACHE_LIMIT = {
	FONTS_MAX_ENTRIES: 10,
	IMAGES_MAX_ENTRIES: 100,
} as const;

const TIME_UNIT = {
	HOURS_IN_DAY: 24,
	MILLISECONDS_IN_SECOND: 1000,
	MINUTES_IN_HOUR: 60,
	SECONDS_IN_MINUTE: 60,
} as const;

const config = ({ mode }: ConfigEnv): ReturnType<typeof defineConfig> => {
	const {
		VITE_APP_API_ORIGIN_URL,
		VITE_APP_DEVELOPMENT_PORT,
		VITE_APP_PROXY_SERVER_URL,
	} = loadEnv(mode, process.cwd());

	const API_PATTERN = new RegExp(VITE_APP_API_ORIGIN_URL as string);

	return defineConfig({
		build: {
			cssMinify: "lightningcss",
			outDir: "build",
			rollupOptions: {
				output: {
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/js/[name]-[hash].js",
					manualChunks: {
						mapbox: ["mapbox-gl"],
					},
				},
			},
			sourcemap: mode === "development",
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
				devOptions: {
					enabled: true,
					type: "module",
				},
				includeManifestIcons: false,
				manifest: {
					background_color: "#ffffff",
					description:
						"Interactive mapping platform for exploring large, complex areas",
					icons: [
						{
							sizes: "192x192",
							src: "/assets/images/pwa-192x192.png",
							type: "image/png",
						},
						{
							sizes: "512x512",
							src: "/assets/images/pwa-512x512.png",
							type: "image/png",
						},
						{
							purpose: "any",
							sizes: "512x512",
							src: "/assets/images/pwa-512x512.png",
							type: "image/png",
						},
						{
							purpose: "maskable",
							sizes: "512x512",
							src: "/assets/images/pwa-512x512.png",
							type: "image/png",
						},
					],
					name: "SmartScapes",
					scope: "/",
					short_name: "SmartScapes",
					start_url: "/",
					theme_color: "#ffffff",
				},
				registerType: "autoUpdate",
				workbox: {
					globIgnores: ["**/node_modules/**/*", "sw.js", "workbox-*.js"],
					globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,woff2}"],
					maximumFileSizeToCacheInBytes: MAX_FILE_CACHE_SIZE_MB * BYTES_IN_MB,
					navigateFallback: "/index.html",
					navigateFallbackDenylist: [API_PATTERN],
					runtimeCaching: [
						{
							handler: "NetworkOnly",
							urlPattern: API_PATTERN,
						},
						{
							handler: "NetworkOnly",
							urlPattern: /^https:\/\/.*\.mapbox\.com\//,
						},
						{
							handler: "StaleWhileRevalidate",
							options: {
								cacheName: "images",
								expiration: {
									maxAgeSeconds:
										CACHE_DURATION_DAYS.IMAGES *
										TIME_UNIT.HOURS_IN_DAY *
										TIME_UNIT.MINUTES_IN_HOUR *
										TIME_UNIT.SECONDS_IN_MINUTE,
									maxEntries: CACHE_LIMIT.IMAGES_MAX_ENTRIES,
								},
							},
							urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
						},
						{
							handler: "CacheFirst",
							options: {
								cacheName: "fonts",
								expiration: {
									maxAgeSeconds:
										CACHE_DURATION_DAYS.FONTS *
										TIME_UNIT.HOURS_IN_DAY *
										TIME_UNIT.MINUTES_IN_HOUR *
										TIME_UNIT.SECONDS_IN_MINUTE,
									maxEntries: CACHE_LIMIT.FONTS_MAX_ENTRIES,
								},
							},
							urlPattern: /\.(?:woff|woff2|ttf|eot)$/,
						},
					],
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
