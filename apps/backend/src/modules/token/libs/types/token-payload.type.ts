import { type JWTPayload } from "jose";

import { type UserSignUpResponseDto } from "~/modules/users/users.js";

type TokenPayload = JWTPayload & Pick<UserSignUpResponseDto, "id">;

export { type TokenPayload };
