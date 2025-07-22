import bcrypt from "bcrypt";

import { type Config } from "~/libs/modules/config/config.js";

import { type Encryption } from "./types/types.js";

class BaseEncryption implements Encryption {
	private saltRounds: number;

	public constructor(config: Config) {
		this.saltRounds = config.ENV.ENCRYPTION.SALT_ROUNDS;
	}

	public async compare(data: string, hash: string): Promise<boolean> {
		return await bcrypt.compare(data, hash);
	}

	public async encrypt(
		data: string,
	): Promise<{ encryptedData: string; salt: string }> {
		const salt = await bcrypt.genSalt(this.saltRounds);
		const encryptedData = await bcrypt.hash(data, salt);

		return { encryptedData, salt };
	}
}

export { BaseEncryption };
