import { type CategoryCreateRequestDto } from "~/modules/categories/categories.js";

type CreateCategoryFormValues = Pick<CategoryCreateRequestDto, "name">;

export { type CreateCategoryFormValues };
