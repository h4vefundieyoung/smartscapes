import { type FastifyHelmetOptions } from "@fastify/helmet";

const HELMET_CONFIG: FastifyHelmetOptions = {
	contentSecurityPolicy: {
		directives: {
			childSrc: ["'self'", "blob:"],
			connectSrc: [
				"'self'",
				"https://api.mapbox.com",
				"https://events.mapbox.com",
				"https://*.tiles.mapbox.com",
			],
			defaultSrc: ["'self'"],
			fontSrc: ["'self'", "data:"],
			imgSrc: [
				"'self'",
				"data:",
				"blob:",
				"https://smartscapes-app.s3.amazonaws.com",
			],
			scriptSrc: ["'self'", "'unsafe-inline'"],
			styleSrc: ["'self'", "'unsafe-inline'"],
		},
		useDefaults: true,
	},
};

export { HELMET_CONFIG };
