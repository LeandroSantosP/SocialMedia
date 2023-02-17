import { Router } from "express";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { CreateCategoriesController } from "../modules/categories/CreateCategory/CreateCategoriesController";
import { CreateCategoryOnPostController } from "../modules/categories/CreateCategoryOnPost/CreateCategoryOnPostController";
import { GetAllCategoriesController } from "../modules/categories/getAllCategories/GetAllCategoryController";

const crateCategoryController = new CreateCategoriesController();
const createCategoryOnPostController = new CreateCategoryOnPostController();
const getAllCategoriesController = new GetAllCategoriesController();

const categoryRoute = Router();

categoryRoute.get("/", getAllCategoriesController.handle);
categoryRoute.use(ensureAuthentication);
categoryRoute.post("/", crateCategoryController.handle);
categoryRoute.post("/post", createCategoryOnPostController.handle);

export { categoryRoute };
