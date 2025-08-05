import {
	GroupExceptionMessage,
	type GroupItemResponseDto,
} from "@smartscapes/shared";

import { type CollectionResult } from "~/libs/types/collection-result.type.js";
import { type Service } from "~/libs/types/service.type.js";

import { type GroupEntity } from "./group.entity.js";
import { type GroupRepository } from "./group.repository.js";

class GroupService implements Service<GroupItemResponseDto> {
	private groupRepository: GroupRepository;

	public constructor(groupRepository: GroupRepository) {
		this.groupRepository = groupRepository;
	}

	public async create(payload: unknown): Promise<GroupItemResponseDto> {
		const item = await this.groupRepository.create(payload as GroupEntity);

		return item.toObject();
	}

	public async find(id: number): Promise<GroupItemResponseDto> {
		const group = await this.groupRepository.find(id);

		if (!group) {
			throw new Error(GroupExceptionMessage.GROUP_NOT_FOUND);
		}

		return group.toObject();
	}

	public async findAll(): Promise<CollectionResult<GroupItemResponseDto>> {
		const groups = await this.groupRepository.findAll();

		return {
			items: groups.map((group) => group.toObject()),
		};
	}

	public async findByKey(key: string): Promise<GroupItemResponseDto | null> {
		const group = await this.groupRepository.findByKey(key);

		return group?.toObject() || null;
	}
}

export { GroupService };
