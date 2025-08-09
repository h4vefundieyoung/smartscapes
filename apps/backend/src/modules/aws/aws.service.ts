import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

import { type Config } from "~/libs/modules/config/config.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import {
	type FileGetUploadUrlRequestDto,
	type FileUploadUrlResponseDto,
} from "~/modules/files/files.js";

class AWSService {
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
		const { fileName, fileType } = payload;

		// eslint-disable-next-line no-console
		console.log("Backend received fileType:", fileType);

		const fileKey = this.generateFileKey(fileName);
		const expiresIn = 300;

		const { fields, url } = await createPresignedPost(this.s3Client, {
			Bucket: this.bucketName,
			Expires: expiresIn,
			Key: fileKey,
		});

		// eslint-disable-next-line no-console
		console.log("Backend generated fields:", fields);

		this.logger.info(`Generated presigned URL for file: ${fileKey}`);

		return {
			expiresIn,
			fields,
			fileKey,
			uploadUrl: url,
		};
	}

	private generateFileKey(fileName: string): string {
		const timestamp = String(Date.now());
		const extension = String(fileName.split(".").pop());

		return `uploads/${timestamp}-${extension}`;
	}
}

export { AWSService };
