import { Router } from "express";
import { ensureAuthentication } from "../modules/shared/infra/http/middlewares/ensureAuthentication";
import { ReviewPostController } from "../modules/review/ReviewPost/ReviewPostController";

const ReviewRouter = Router();

const reviewPostController = new ReviewPostController();

ReviewRouter.use(ensureAuthentication);
ReviewRouter.post("/", reviewPostController.handle);

export { ReviewRouter };
