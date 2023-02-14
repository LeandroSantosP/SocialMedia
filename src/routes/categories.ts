import { Router } from "express";
import { CreateCategoriesController } from "../modules/categories/service/CreateCategory/CreateCategoriesController";
import { CreateCategoryOnPostController } from "../modules/categories/service/CreateCategoryOnPost/CreateCategoryOnPostController";
import { GetAllCategoriesController } from "../modules/categories/service/getAllCategories/GetAllCategoryController";

const crateCategoryController = new CreateCategoriesController();
const createCategoryOnPostController = new CreateCategoryOnPostController();
const getAllCategoriesController = new GetAllCategoriesController();

const categoryRoute = Router();

categoryRoute.post("/", crateCategoryController.handle);
categoryRoute.post("/post", createCategoryOnPostController.handle);

categoryRoute.get("/", getAllCategoriesController.handle);

export { categoryRoute };
