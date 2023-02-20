import { ClientDTO } from "modules/shared/dtos/ClientDTO";
import { CategoryDTO } from "../../../shared/dtos/CategoryDTO";
import { CAtegoryAndPostResponse } from "../types";

export interface GetAllClientInfosProps {
  client_admin_id: number;
}

export abstract class ICategoriesContract {
  abstract create(dados: CategoryDTO): Promise<void>;
  abstract list(): Promise<CategoryDTO[]>;

  abstract DeleteCategory(category_id: string): Promise<CategoryDTO>;

  abstract listAllCategoriesAndPosts(): Promise<CAtegoryAndPostResponse[]>;

  abstract findUnique(slug: string): Promise<CategoryDTO | null>;
  abstract findUniqueByName(name: string): Promise<CategoryDTO | null>;
}
