import { type UserRouteEntity } from "../../user-route.entity.js";

type UserRouteFilter = Partial<ReturnType<UserRouteEntity["toObject"]>>;

export { type UserRouteFilter };
