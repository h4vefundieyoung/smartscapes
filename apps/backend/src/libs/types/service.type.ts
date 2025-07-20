type Service<T = unknown> = Partial<{
	create(payload: unknown): Promise<T>;
	delete(id: number): Promise<boolean>;
	find(id: number): Promise<T>;
	findAll(parameters: unknown): Promise<T[]>;
	update(id: number, payload: Partial<T>): Promise<T>;
}>;

export { type Service };
