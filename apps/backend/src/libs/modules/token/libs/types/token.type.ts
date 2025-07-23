import { type TokenPayload } from "./token-payload.type.js";

type Token = {
	create(id: TokenPayload["id"]): Promise<string>;
	verify(jwt: string): Promise<TokenPayload["id"]>;
};

export { type Token };
