import { type BaseToken } from "~/libs/modules/token/token.js";
import {
	type UserService,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/users.js";

type Constructor = {
	tokenService: BaseToken;
	userService: UserService;
};

class AuthService {
	private tokenService: BaseToken;

	private userService: UserService;

	public constructor({ tokenService, userService }: Constructor) {
		this.tokenService = tokenService;
		this.userService = userService;
	}

	public async signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		const user = await this.userService.create(userRequestDto);
		const token = await this.tokenService.create({ userId: user.id });

		return { token, user };
	}
}

export { AuthService };
