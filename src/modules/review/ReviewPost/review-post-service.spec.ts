import "reflect-metadata";
import { PostRepositoryInMemory } from "../../posts/infra/repositories/in-memory/PostRepositoryInMemory";
import { ReviewPostRepositoryInMemory } from "../infra/Repository/in-memory/ReviewPostRepositoryInMemory";
import { ReviewPostService } from "./ReviewPostService";

let reviewPostService: ReviewPostService;
let reviewPostRepositoryInMemory: ReviewPostRepositoryInMemory;
let postRepositoryInMemory: PostRepositoryInMemory;

describe("Make a Review", () => {
  beforeEach(() => {
    reviewPostRepositoryInMemory = new ReviewPostRepositoryInMemory();
    postRepositoryInMemory = new PostRepositoryInMemory();

    reviewPostService = new ReviewPostService(
      reviewPostRepositoryInMemory,
      postRepositoryInMemory
    );
  });
  it("should be able to create a new Review on post", async () => {
    let res = await reviewPostService.execute({
      client_id: 1,
      post_id: "DSAsd",
    });
  });
});
