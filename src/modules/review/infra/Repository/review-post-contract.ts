import { Post } from "@prisma/client";
import { reviewDTO } from "../prisma/ReviewDTO";

export interface ICreateRequest {
  client_id: number;
  post_id: string;
}

export interface IToggleLikeReview {
  reviewId: string | undefined;
  currentReview: boolean;
}
export abstract class ReviewPostContract {
  abstract create({ client_id, post_id }: ICreateRequest): Promise<{
    post: Post;
  }>;

  abstract ToggleLikeReview({
    currentReview,
    reviewId,
  }: IToggleLikeReview): Promise<any>;

  abstract getReviewByClientId(client_id: number): Promise<reviewDTO[] | null>;
}
