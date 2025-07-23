import { jwtVerify, SignJWT } from "jose";

import { type Config } from "~/libs/modules/config/config.js";

import { type TokenPayload } from "./libs/types/types.js";

type Constructor = {
	config: Config;
};

class TokenService {
	private config: Config;

	public constructor({ config }: Constructor) {
		this.config = config;
	}

	public async create(id: TokenPayload["id"]): Promise<string> {
		const secret = this.generateSecret();

		const jwt = await new SignJWT({ id })
			.setProtectedHeader({ alg: this.config.ENV.AUTH.JWS_ALGORITHM })
			.setIssuedAt()
			.setExpirationTime(this.config.ENV.AUTH.TOKEN_EXPIRATION)
			.sign(secret);

		return jwt;
	}

	public async verify(jwt: string): Promise<TokenPayload["id"]> {
		const secret = this.generateSecret();

		const { payload } = await jwtVerify(jwt, secret);
		const { id } = payload as TokenPayload;

		return id;
	}

	private generateSecret(): Uint8Array {
		const secret = new TextEncoder().encode(this.config.ENV.AUTH.JWT_SECRET);

		return secret;
	}
}

export { TokenService };
