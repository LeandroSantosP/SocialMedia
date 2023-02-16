import { Router } from "express";
import { CreatePostController } from "../modules/posts/createPost/CreatePostController";
import { GetAllPostController } from "../modules/posts/getAllPosts/GetAllPostsController";

const createPostController = new CreatePostController();
const getAllPostController = new GetAllPostController();

const postRouter = Router();

postRouter.post("/", createPostController.handle);
postRouter.get("/", getAllPostController.handle);

export { postRouter };
