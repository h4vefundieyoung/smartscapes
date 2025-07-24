import { type JWTPayload } from "jose";

type TokenPayload = JWTPayload & { payload: unknown };

export { type TokenPayload };
