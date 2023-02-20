import { Post, Review } from "@prisma/client";
import { CommentDTO } from "../../shared/dtos/CommentDTO";
import { reviewDTO } from "../../review/infra/prisma/ReviewDTO";
import { inject, injectable } from "tsyringe";
import { IPostContract } from "../infra/repositories/create-post-contract";

@injectable()
export class GetAllPostService {
  constructor(
    @inject("PostRepository")
    private PostRepository: IPostContract
  ) {}

  async execute() {
    const result = (await this.PostRepository.getAllPost()) as (Post & {
      CategoriesOnPosts: {
        category: {
          name: string;
          slug: string;
        };
      }[];
      comments: CommentDTO[];
      review: reviewDTO[];
      author: {
        id: number;
        name: string;
        IsAdmin: boolean;
      };
    })[];

    for (let i = 0; i < result.length; i++) {
      const current = result[i];
      const categoryPropRemoved = current.CategoriesOnPosts.map(
        (cate) => cate.category
      ) as any;

      current.CategoriesOnPosts = categoryPropRemoved;
    }

    return result;
  }
}
