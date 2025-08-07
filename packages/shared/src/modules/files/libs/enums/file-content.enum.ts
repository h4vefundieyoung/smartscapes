type FileContentType =
	| "image/bmp"
	| "image/gif"
	| "image/jpeg"
	| "image/jpg"
	| "image/png"
	| "image/svg+xml"
	| "image/webp"
	| "image/x-icon";

const FileContent = {
	BMP: "image/bmp",
	GIF: "image/gif",
	ICO: "image/x-icon",
	JPEG: "image/jpeg",
	JPG: "image/jpg",
	PNG: "image/png",
	SVG: "image/svg+xml",
	WEBP: "image/webp",
} as const satisfies Record<string, FileContentType>;

export { FileContent };
export { type FileContentType };
