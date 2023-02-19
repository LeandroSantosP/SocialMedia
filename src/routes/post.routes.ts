import { Router } from "express";
import { ensureAuthentication } from "../modules/shared/infra/http/middlewares/ensureAuthentication";
import { CreatePostController } from "../modules/posts/createPost/CreatePostController";
import { DeletePostController } from "../modules/posts/deletePost/DeletePostController";
import { GetAllPostController } from "../modules/posts/getAllPosts/GetAllPostsController";
import { UpdatedPostController } from "../modules/posts/UpdatePost/UpdatedPostController";

const createPostController = new CreatePostController();
const getAllPostController = new GetAllPostController();
const deletePostController = new DeletePostController();
const updatedPostController = new UpdatedPostController();

const postRouter = Router();

postRouter.get("/", getAllPostController.handle);
postRouter.use(ensureAuthentication);
postRouter.patch("/:post_id", updatedPostController.handle);
postRouter.post("/", createPostController.handle);
postRouter.delete("/delete/:postId", deletePostController.handle);

export { postRouter };
