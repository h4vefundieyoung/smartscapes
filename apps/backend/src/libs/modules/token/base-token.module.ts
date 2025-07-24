import { jwtVerify, SignJWT } from "jose";

import { type Token, type TokenPayload } from "./libs/types/types.js";

type Constructor = {
	jwtAlgorithm: string;
	jwtSecret: string;
	tokenExpirationTime: string;
};

class BaseToken implements Token {
	private jwtAlgorithm: string;

	private secret: Uint8Array;

	private tokenExpirationTime: string;

	public constructor({
		jwtAlgorithm,
		jwtSecret,
		tokenExpirationTime,
	}: Constructor) {
		this.jwtAlgorithm = jwtAlgorithm;
		this.secret = new TextEncoder().encode(jwtSecret);
		this.tokenExpirationTime = tokenExpirationTime;
	}

	public async create(id: TokenPayload["id"]): Promise<string> {
		const jwt = await new SignJWT({ id })
			.setProtectedHeader({ alg: this.jwtAlgorithm })
			.setIssuedAt()
			.setExpirationTime(this.tokenExpirationTime)
			.sign(this.secret);

		return jwt;
	}

	public async verify(jwt: string): Promise<TokenPayload["id"]> {
		const { payload } = await jwtVerify(jwt, this.secret);
		const { id } = payload as TokenPayload;

		return id;
	}
}

export { BaseToken };
