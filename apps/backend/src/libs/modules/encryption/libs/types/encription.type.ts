type Encryption = {
	generateSalt(): Promise<string>;
	hashPassword(password: string, salt: string): Promise<string>;
	verifyPassword(password: string, hashedPassword: string): Promise<boolean>;
};

export { type Encryption };
