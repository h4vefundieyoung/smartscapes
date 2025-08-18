import { type NavigateOptions, type To, useNavigate } from "react-router";

type NavigateFunction = {
	(to: To, options?: NavigateOptions): void;
	(delta: number): void;
};

const useAppNavigate = (): NavigateFunction => useNavigate();

export { useAppNavigate };
