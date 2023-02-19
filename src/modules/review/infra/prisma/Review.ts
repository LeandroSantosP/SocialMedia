import { Entity } from "../../../shared/core/Entity";
import { reviewDTO } from "./ReviewDTO";

export class ReviewEntity extends Entity<reviewDTO> {
  constructor(props: reviewDTO) {
    super(props);
  }

  static create(props: reviewDTO) {
    const newReview = new ReviewEntity(props);
    return newReview;
  }
}
