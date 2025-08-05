class TokenBlacklistService {
	private blacklistedTokens: Map<string, number> = new Map();

	public add(token: string, expirationTimeMs: number): void {
		this.blacklistedTokens.set(token, expirationTimeMs);

		setTimeout(
			() => this.blacklistedTokens.delete(token),
			expirationTimeMs - Date.now(),
		);
	}

	public has(token: string): boolean {
		const expirationTime = this.blacklistedTokens.get(token);

		return expirationTime !== undefined && Date.now() < expirationTime;
	}
}

export { TokenBlacklistService };
