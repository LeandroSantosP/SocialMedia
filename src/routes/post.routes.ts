import { Router } from "express";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { CreatePostController } from "../modules/posts/createPost/CreatePostController";
import { DeletePostController } from "../modules/posts/deletePost/DeletePostController";
import { GetAllPostController } from "../modules/posts/getAllPosts/GetAllPostsController";

const createPostController = new CreatePostController();
const getAllPostController = new GetAllPostController();
const deletePostController = new DeletePostController();

const postRouter = Router();

postRouter.get("/", getAllPostController.handle);
postRouter.use(ensureAuthentication);
postRouter.post("/", createPostController.handle);
postRouter.delete("/delete/:authorId", deletePostController.handle);

export { postRouter };
