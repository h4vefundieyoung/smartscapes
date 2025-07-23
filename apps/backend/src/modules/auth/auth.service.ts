import { type TokenPayload, type TokenService } from "~/modules/token/token.js";
import {
	type UserService,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/users.js";

type Constructor = {
	tokenService: TokenService;
	userService: UserService;
};

class AuthService {
	private tokenService: TokenService;

	private userService: UserService;

	public constructor({ tokenService, userService }: Constructor) {
		this.tokenService = tokenService;
		this.userService = userService;
	}

	public async generateToken(id: TokenPayload["id"]): Promise<string> {
		return await this.tokenService.create(id);
	}

	public async signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		return await this.userService.create(userRequestDto);
	}
}

export { AuthService };
