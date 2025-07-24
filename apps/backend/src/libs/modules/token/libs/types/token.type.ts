import { type JWTPayload } from "jose";

import { type TokenPayload } from "./token-payload.type.js";

type Token = {
	create(payload: TokenPayload["payload"]): Promise<string>;
	verify<Payload extends JWTPayload = JWTPayload>(
		jwt: string,
	): Promise<Payload>;
};

export { type Token };
