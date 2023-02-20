import { prisma } from "../../../../prisma/client";
import {
  ReviewPostContract,
  ICreateRequest,
  IToggleLikeReview,
  ICreateResponse,
} from "../review-post-contract";
import { ReviewEntity } from "../../prisma/Review";
import { reviewDTO } from "../../prisma/ReviewDTO";

export class ReviewPostRepository implements ReviewPostContract {
  private prisma;

  constructor() {
    this.prisma = prisma;
  }

  async getReviewByClientId(client_id: number): Promise<reviewDTO[] | null> {
    const Review = await this.prisma.review.findMany({
      where: {
        clientId: client_id,
      },
    });

    return Review;
  }

  async ToggleLikeReview({
    currentReview,
    reviewId,
  }: IToggleLikeReview): Promise<any> {
    const UpdatedReview = await this.prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        iliked: currentReview,
      },
    });

    return UpdatedReview;
  }

  async create({ client_id, post_id }: ICreateRequest): Promise<void> {
    const newReview = ReviewEntity.create({
      clientId: client_id,
      iliked: false,
      postId: post_id,
    });

    await this.prisma.review.create({
      data: {
        author: {
          connect: {
            id: newReview.props.clientId,
          },
        },
        iliked: newReview.props.iliked,
        post: {
          connect: {
            id: newReview.props.postId,
          },
        },
      },
      select: {
        iliked: true,
        post: true,
      },
    });

    return;
  }
}
