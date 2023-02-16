import { Router } from "express";
import { CreatePostController } from "../modules/posts/createPost/CreatePostController";
import { DeletePostController } from "../modules/posts/deletePost/DeletePostController";
import { GetAllPostController } from "../modules/posts/getAllPosts/GetAllPostsController";

const createPostController = new CreatePostController();
const getAllPostController = new GetAllPostController();
const deletePostController = new DeletePostController();

const postRouter = Router();

postRouter.post("/", createPostController.handle);
postRouter.get("/", getAllPostController.handle);
postRouter.delete("/delete/:authorId", deletePostController.handle);

export { postRouter };
