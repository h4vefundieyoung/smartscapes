import { type FileContentType } from "../types/file-content-type.type.js";

const FileContent = {
	GIF: "image/gif",
	JPEG: "image/jpeg",
	JPG: "image/jpg",
	PNG: "image/png",
	WEBP: "image/webp",
} as const satisfies Record<string, FileContentType>;

export { FileContent };
