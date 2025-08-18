import { type store } from "../modules/store/store.js";

type RootState = ReturnType<typeof store.instance.getState>;

export { type RootState };
