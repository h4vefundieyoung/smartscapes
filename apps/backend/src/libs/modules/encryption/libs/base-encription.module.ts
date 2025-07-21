import bcrypt from "bcrypt";

import { type Encryption } from "./types/types.js";

const SALT_ROUNDS = 10;

class BaseEncryption implements Encryption {
	public async generateSalt(): Promise<string> {
		return await bcrypt.genSalt(SALT_ROUNDS);
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
