import {
	type BaseToken,
	type TokenPayload,
} from "~/libs/modules/token/token.js";
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
		const { email, id } = await this.userService.create(userRequestDto);
		const token = await this.generateToken(id);

		return { token, user: { email, id } };
	}

	private async generateToken(id: TokenPayload["id"]): Promise<string> {
		return await this.tokenService.create(id);
	}
}

export { AuthService };
