import { type JWTPayload } from "jose";

import { type UserAuthResponseDto } from "~/modules/users/users.js";

type TokenPayload = JWTPayload & Pick<UserAuthResponseDto, "id">;

export { type TokenPayload };
