import { Post, Review } from "@prisma/client";
import { randomUUID } from "crypto";
import { ReviewEntity } from "../../prisma/Review";
import { reviewDTO } from "../../prisma/ReviewDTO";
import {
  ICreateRequest,
  ICreateResponse,
  IToggleLikeReview,
  ReviewPostContract,
} from "../review-post-contract";

export class ReviewPostRepositoryInMemory implements ReviewPostContract {
  private Reviews: Review[] = [];
  private Post: Post[] = [];

  async create({ client_id, post_id }: ICreateRequest): Promise<void> {
    const newReview = ReviewEntity.create({
      id: randomUUID(),
      clientId: client_id,
      iliked: null,
      postId: post_id,
      created_at: new Date(),
    });

    const PostLiked: Post = {
      id: randomUUID(),
      title: "DSadsda",
      content: "Dsadsakbvshabdkjsab",
      authorId: newReview.props.clientId,
      visible: false,
      IsActive: false,
      created_at: new Date(),
      updated_At: new Date(),
      IsPublished: false,
    };

    return;
  }

  async ToggleLikeReview({
    currentReview,
    reviewId,
  }: IToggleLikeReview): Promise<any> {
    const UpdatedReview = this.Reviews.find((rev) => rev.id === reviewId);

    if (UpdatedReview) {
      UpdatedReview.iliked = currentReview;
    }

    return;
  }
  async getReviewByClientId(client_id: number): Promise<reviewDTO[] | null> {
    const allReview = this.Reviews.filter((rev) => rev.clientId === client_id);

    return allReview;
  }
}
