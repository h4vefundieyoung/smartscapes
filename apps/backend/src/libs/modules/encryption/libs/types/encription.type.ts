type Encryption = {
	compare(data: string, hash: string): Promise<boolean>;
	encrypt(data: string): Promise<{ encryptedData: string; salt: string }>;
};

export { type Encryption };
