import { ApplicationError } from "@smartscapes/shared/src/libs/exceptions/exceptions.js";

import { type encryption } from "~/libs/modules/encryption/libs/encryption.js";
import { type UserRepository } from "~/modules/users/user.repository.js";
import {
	type UserService,
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/users.js";

class AuthService {
	private encryptionService: typeof encryption;
	private userRepository: UserRepository;
	private userService: UserService;

	public constructor(
		userService: UserService,
		encryptionService: typeof encryption,
		userRepository: UserRepository,
	) {
		this.userService = userService;
		this.encryptionService = encryptionService;
		this.userRepository = userRepository;
	}

	public async signIn(
		userRequestDto: UserSignInRequestDto,
	): Promise<UserSignUpResponseDto> {
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

		return user.toObject();
	}

	public async signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		return await this.userService.create(userRequestDto);
	}
}

export { AuthService };
