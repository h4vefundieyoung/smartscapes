import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

import { FILE_SIZE_MB } from "~/libs/constants/constants.js";
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
		const MAX_FILE_SIZE_MB = 10;
		const { folder, name, type } = payload;
		const key = `${folder}/${name}`;

		const { fields, url } = await createPresignedPost(this.s3Client, {
			Bucket: this.bucketName,
			Conditions: [
				["content-length-range", 0, FILE_SIZE_MB * MAX_FILE_SIZE_MB],
				["starts-with", "$Content-Type", "image/"],
			],
			Fields: {
				"Content-Type": type,
			},
			Key: key,
		});

		this.logger.info(`Generated presigned URL for file: ${name}`);

		return {
			fields,
			uploadUrl: url,
		};
	}
}

export { AWSService };
