import { type encryption } from "~/libs/modules/encryption/libs/encryption.js";
import { type BaseToken } from "~/libs/modules/token/token.js";
import {
	type UserService,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/users.js";

import { AuthorizationExceptionMessage } from "./libs/enums/enums.js";
import { AuthorizationError } from "./libs/exceptions/auth.exception.js";

type Constructor = {
	encryptionService: typeof encryption;
	tokenService: BaseToken;
	userService: UserService;
};

class AuthService {
	private encryptionService: typeof encryption;
	private tokenService: BaseToken;
	private userService: UserService;

	public constructor({
		encryptionService,
		tokenService,
		userService,
	}: Constructor) {
		this.encryptionService = encryptionService;
		this.tokenService = tokenService;
		this.userService = userService;
	}

	public async signIn(
		userRequestDto: UserSignInRequestDto,
	): Promise<UserSignInResponseDto> {
		const { email, password } = userRequestDto;

		const user = await this.userService.findByEmail(email, {
			includePassword: true,
		});

		if (!user || !user.passwordHash) {
			throw new AuthorizationError({
				message: AuthorizationExceptionMessage.INVALID_CREDENTIALS,
			});
		}

		const arePasswordsMatch = await this.encryptionService.compare(
			password,
			user.passwordHash,
		);

		if (!arePasswordsMatch) {
			throw new AuthorizationError({
				message: AuthorizationExceptionMessage.INVALID_CREDENTIALS,
			});
		}

		const token = await this.tokenService.create({ userId: user.id });

		return {
			token,
			user: {
				email: user.email,
				id: user.id,
			},
		};
	}

	public async signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		const { email, id } = await this.userService.create(userRequestDto);
		const token = await this.tokenService.create({ userId: id });

		return { token, user: { email, id } };
	}
}

export { AuthService };
