import { container } from "tsyringe";
import { ICategoriesContract } from "../Repositorys/CategoriesRepository/categories-repository-contract";
import { CategoriesRepository } from "../Repositorys/CategoriesRepository/implementations/CategoriesRepository";
import { ClientRepositoryContract } from "../Repositorys/ClientRepository/client-repository-contract";
import { ClientRepository } from "../Repositorys/ClientRepository/implemetations/ClientRepository";
import { CommentsRepository } from "../Repositorys/CommentsRepository/implemetations/CommentsRepository";
import { CommentsRepositoryContract } from "../Repositorys/CommentsRepository/comment-repository-contract";
import { CategoryOnPostContract } from "../Repositorys/CreateCategoryOnPostDService.ts/categoryonpost-repository-contract";
import { CategoryOnPostRepository } from "../Repositorys/CreateCategoryOnPostDService.ts/implemetation/CategoryOnPostRepository";
import { IPostContract } from "../Repositorys/PostRepository/create-post-contract";
import { PostRepository } from "../Repositorys/PostRepository/implementations/PostRepository";

container.registerSingleton<ICategoriesContract>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<CategoryOnPostContract>(
  "CategoryOnPostRepository",
  CategoryOnPostRepository
);

container.registerSingleton<ClientRepositoryContract>(
  "ClientRepository",
  ClientRepository
);

container.registerSingleton<CommentsRepositoryContract>(
  "CommentsRepository",
  CommentsRepository
);

container.registerSingleton<IPostContract>("PostRepository", PostRepository);
