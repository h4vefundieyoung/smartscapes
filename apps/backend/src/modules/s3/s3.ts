import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { type Config } from "~/libs/modules/config/config.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import {
	type FileGetUploadUrlRequestDto,
	type FileUploadUrlResponseDto,
} from "~/modules/files/files.js";

class S3Service {
	private bucketName: string;
	private logger: Logger;
	private s3Client: S3Client;

	public constructor(config: Config, logger: Logger) {
		this.bucketName = config.ENV.AWS.S3_BUCKET_NAME;
		this.logger = logger;

		this.s3Client = new S3Client({
			credentials: {
				accessKeyId: config.ENV.AWS.ACCESS_KEY_ID,
				secretAccessKey: config.ENV.AWS.SECRET_ACCESS_KEY,
			},
			region: config.ENV.AWS.REGION,
		});
	}

	public async getUploadUrl(
		payload: FileGetUploadUrlRequestDto,
	): Promise<FileUploadUrlResponseDto> {
		const { fileName, fileSize, fileType } = payload;

		const fileKey = this.generateFileKey(fileName);
		const expiresIn = 3600;

		const command = new PutObjectCommand({
			Bucket: this.bucketName,
			ContentLength: fileSize,
			ContentType: fileType,
			Key: fileKey,
		});

		const uploadUrl = await getSignedUrl(this.s3Client, command, {
			expiresIn,
		});

		this.logger.info(`Generated presigned URL for file: ${fileKey}`);

		return {
			expiresIn,
			fileKey,
			uploadUrl,
		};
	}

	private generateFileKey(fileName: string): string {
		const timestamp = String(Date.now());
		const extension = String(fileName.split(".").pop());

		return `uploads/${timestamp}-${extension}`;
	}
}

export { S3Service };
