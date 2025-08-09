type FileUploadUrlResponseDto = {
	expiresIn: number;
	fields: Record<string, string>;
	fileKey: string;
	uploadUrl: string;
};

export { type FileUploadUrlResponseDto };
