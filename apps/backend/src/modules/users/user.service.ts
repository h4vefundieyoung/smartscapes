import { CommonExceptionMessage } from "@smartscapes/shared";

import { encryption } from "~/libs/modules/encryption/libs/encryption.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type CollectionResult, type Service } from "~/libs/types/types.js";
import { UserExceptionMessage } from "~/modules/users/libs/enums/enums.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserRepository } from "~/modules/users/user.repository.js";

import { UserError } from "./libs/exceptions/exceptions.js";
import {
	type UserGetByIdItemResponseDto,
	type UserPasswordDetails,
	type UserSignUpRequestDto,
} from "./libs/types/types.js";

class UserService implements Service {
	private userRepository: UserRepository;

	public constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	public async create(
		payload: UserSignUpRequestDto,
	): Promise<UserGetByIdItemResponseDto> {
		const existingUser = await this.findByEmail(payload.email);

		if (existingUser) {
			throw new UserError({
				message: UserExceptionMessage.USER_ALLREADY_EXISTS as string,
				status: HTTPCode.CONFLICT,
			});
		}

		const { encryptedData, salt } = await encryption.encrypt(payload.password);

		const item = await this.userRepository.create(
			UserEntity.initializeNew({
				email: payload.email,
				firstName: payload.firstName,
				lastName: payload.lastName,
				passwordHash: encryptedData,
				passwordSalt: salt,
			}),
		);

		if (!item.toObject().id) {
			throw new UserError({
				message: CommonExceptionMessage.COMMON_EXCEPTION_MESSAGE,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			});
		}

		const newUser = await this.findById(item.toObject().id);

		if (!newUser) {
			throw new UserError({
				message: CommonExceptionMessage.COMMON_EXCEPTION_MESSAGE,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return newUser;
	}

	public async findAll(): Promise<
		CollectionResult<UserGetByIdItemResponseDto>
	> {
		const items = await this.userRepository.findAll();

		return {
			items,
		};
	}

	public async findByEmail(
		email: string,
	): Promise<null | UserGetByIdItemResponseDto> {
		const user = await this.userRepository.findByEmail(email);

		return user;
	}

	public async findById(
		id: number,
	): Promise<null | UserGetByIdItemResponseDto> {
		const user = await this.userRepository.findById(id);

		return user;
	}

	public async findPasswordDetails(
		email: string,
	): Promise<null | UserPasswordDetails> {
		return await this.userRepository.findPasswordDetails(email);
	}
}

export { UserService };
