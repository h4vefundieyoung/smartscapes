import { ApplicationError } from "@smartscapes/shared/src/libs/exceptions/exceptions.js";

import { type encryption } from "~/libs/modules/encryption/libs/encryption.js";
import { type BaseToken } from "~/libs/modules/token/token.js";
import { type UserRepository } from "~/modules/users/user.repository.js";
import {
	type UserService,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/users.js";

type Constructor = {
	encryptionService: typeof encryption;
	tokenService: BaseToken;
	userRepository: UserRepository;
	userService: UserService;
};

class AuthService {
	private encryptionService: typeof encryption;
	private tokenService: BaseToken;
	private userRepository: UserRepository;
	private userService: UserService;

	public constructor({
		encryptionService,
		tokenService,
		userRepository,
		userService,
	}: Constructor) {
		this.encryptionService = encryptionService;
		this.tokenService = tokenService;
		this.userRepository = userRepository;
		this.userService = userService;
	}

	public async signIn(
		userRequestDto: UserSignInRequestDto,
	): Promise<UserSignInResponseDto> {
		const { email, password } = userRequestDto;

		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			throw new ApplicationError({
				message: "An account with this email does not exist.",
			});
		}

		const arePasswordsMatch = await this.encryptionService.compare(
			password,
			user.getPasswordHash(),
		);

		if (!arePasswordsMatch) {
			throw new ApplicationError({ message: "Invalid credentials." });
		}

		const token = await this.tokenService.create({ userId: user.getId() });

		return { token, user: user.toObject() };
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
