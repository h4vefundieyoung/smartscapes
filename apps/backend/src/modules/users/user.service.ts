import { encryption } from "~/libs/modules/encryption/libs/encription.js";
import { type CollectionResult, type Service } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserRepository } from "~/modules/users/user.repository.js";

import {
	type UserGetAllItemResponseDto,
	type UserSignUpRequestDto,
} from "./libs/types/types.js";

class UserService implements Service {
	private userRepository: UserRepository;

	public constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	public async create(
		payload: UserSignUpRequestDto,
	): Promise<UserGetAllItemResponseDto> {
		const passwordSalt = await encryption.generateSalt();
		const passwordHash = await encryption.hashPassword(
			payload.password,
			passwordSalt,
		);

		const item = await this.userRepository.create(
			UserEntity.initializeNew({
				email: payload.email,
				firstName: payload.firstName,
				lastName: payload.lastName,
				passwordHash,
				passwordSalt,
			}),
		);

		return item.toObject();
	}

	public async findAll(): Promise<CollectionResult<UserGetAllItemResponseDto>> {
		const items = await this.userRepository.findAll();

		return {
			items: items.map((item) => item.toObject()),
		};
	}

	public async findByEmail(
		email: string,
	): Promise<null | UserGetAllItemResponseDto> {
		const user = await this.userRepository.findByEmail(email);

		return user ? user.toObject() : null;
	}
}

export { UserService };
