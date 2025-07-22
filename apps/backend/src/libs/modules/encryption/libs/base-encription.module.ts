import bcrypt from "bcrypt";

import { type Config } from "~/libs/modules/config/config.js";

import { type Encryption } from "./types/types.js";

class BaseEncryption implements Encryption {
	private config: Config;

	public constructor(config: Config) {
		this.config = config;
	}

	public async generateSalt(): Promise<string> {
		const saltRounds = this.config.ENV.ENCRYPTION.SALT_ROUNDS;

		return await bcrypt.genSalt(saltRounds);
	}

	public async hashPassword(password: string, salt: string): Promise<string> {
		return await bcrypt.hash(password, salt);
	}

	public async verifyPassword(
		password: string,
		hashedPassword: string,
	): Promise<boolean> {
		return await bcrypt.compare(password, hashedPassword);
	}
}

export { BaseEncryption };
