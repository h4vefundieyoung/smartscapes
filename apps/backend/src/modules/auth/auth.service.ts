import {
	type UserService,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/users.js";

class AuthService {
	private userService: UserService;

	public constructor(userService: UserService) {
		this.userService = userService;
	}

	public async signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		const user = await this.userService.findByEmail(userRequestDto.email);

		if (user) {
			throw new Error(`User with email ${userRequestDto.email} already exists`);
		}

		return await this.userService.create(userRequestDto);
	}
}

export { AuthService };
