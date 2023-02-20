import { IPostContract } from "../../posts/infra/repositories/create-post-contract";
import { inject, injectable } from "tsyringe";
import { ReviewPostContract } from "../infra/Repository/review-post-contract";
import { AppError } from "../../shared/infra/http/middlewares/appErros";
import { Post, Review } from "@prisma/client";

interface IRequest {
  client_id: number;
  post_id: string;
}

@injectable()
export class ReviewPostService {
  constructor(
    @inject("ReviewPostRepository")
    private ReviewPostRepository: ReviewPostContract,

    @inject("PostRepository")
    private postRepository: IPostContract
  ) {}

  async execute({ client_id, post_id }: IRequest) {
    const all = (await this.postRepository.getAllPost()) as (Post & {
      CategoriesOnPosts: {
        category: {
          name: string;
          slug: string;
        };
      }[];
      comments: Comment[];
      review: Review[];
      author: {
        id: number;
        name: string;
        IsAdmin: boolean;
      };
    })[];

    const postForReview = all.find((post) => post.id == post_id);

    if (!postForReview) {
      throw new AppError("post does not exists!");
    }

    let CurrentReview = postForReview?.review;

    const ReviewAlreadyExits = CurrentReview?.find(
      (review) => review.clientId === client_id
    );

    if (ReviewAlreadyExits) {
      const ReviewUpdate = await this.ReviewPostRepository.ToggleLikeReview({
        currentReview: !ReviewAlreadyExits.iliked,
        reviewId: ReviewAlreadyExits.id,
      });

      return ReviewUpdate;
    } else {
      const FistCommentInPost = await this.ReviewPostRepository.create({
        client_id,
        post_id,
      });

      return FistCommentInPost;
    }
  }
}
