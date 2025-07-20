type HTTPApiResponse<T = unknown> = Omit<Response, "json"> & {
	json(): never | Promise<T>;
};

export { type HTTPApiResponse };
