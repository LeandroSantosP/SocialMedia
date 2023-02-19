import { container } from "tsyringe";
import { ICategoriesContract } from "../../categories/infra/repository/categories-repository-contract";
import { CategoriesRepository } from "../../categories/infra/repository/implemations/CategoriesRepository";
import { ClientRepositoryContract } from "../../clients/infra/repositories/client-repository-contract";
import { ClientRepository } from "../../clients/infra/repositories/implemetaions/ClientRepository";
import { CommentsRepository } from "../Repositorys/CommentsRepository/implemetations/CommentsRepository";
import { CommentsRepositoryContract } from "../Repositorys/CommentsRepository/comment-repository-contract";
import { CategoryOnPostContract } from "../../categories/infra/repository/categoryonpost-repository-contract";
import { CategoryOnPostRepository } from "../../categories/infra/repository/implemations/CategoryOnPostRepository";
import { IPostContract } from "../../posts/infra/repositories/create-post-contract";
import { PostRepository } from "../../posts/infra/repositories/implemetations/PostRepository";
import { ReviewPostContract } from "modules/review/infra/Repository/review-post-contract";
import { ReviewPostRepository } from "../../review/infra/Repository/implementaions/ReviewPostRepository";

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

container.registerSingleton<ReviewPostContract>(
  "ReviewPostRepository",
  ReviewPostRepository
);

container.registerSingleton<IPostContract>("PostRepository", PostRepository);
