import { jwtVerify, SignJWT } from "jose";

import { type Config } from "~/libs/modules/config/config.js";

import { type Token, type TokenPayload } from "./libs/types/types.js";

type Constructor = {
	config: Config;
};

class BaseToken implements Token {
	private config: Config;

	private secret: Uint8Array;

	public constructor({ config }: Constructor) {
		this.config = config;
		this.secret = new TextEncoder().encode(this.config.ENV.AUTH.JWT_SECRET);
	}

	public async create(id: TokenPayload["id"]): Promise<string> {
		const jwt = await new SignJWT({ id })
			.setProtectedHeader({ alg: this.config.ENV.AUTH.JWS_ALGORITHM })
			.setIssuedAt()
			.setExpirationTime(this.config.ENV.AUTH.TOKEN_EXPIRATION)
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
