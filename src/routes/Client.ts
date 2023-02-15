import { CrateNewClientController } from "../modules/clients/service/CreateNewClient/CreateNewClientController";
import { Router } from "express";
import { GetAllCategoriesController } from "../modules/categories/service/getAllCategories/GetAllCategoryController";
import { GetAllPostController } from "../modules/posts/services/getAllPosts/GetAllPostsController";
import { GetAllPostOfClientController } from "../modules/clients/service/GetAllPostOfClient/GetAllPostOfClientController";

const crateNewClientController = new CrateNewClientController();
const getAllPostOfClientController = new GetAllPostOfClientController();

const clientRoute = Router();

clientRoute.post("/", crateNewClientController.handle);
clientRoute.get("/posts", getAllPostOfClientController.handle);

export { clientRoute };
