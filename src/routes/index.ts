import { Router } from "express";
import { categoryRoute } from "./categories";
import { clientRoute } from "./Client";
import { postRouter } from "./post.routes";

const AllRoutes = Router();

/* Client */
AllRoutes.use("/client", clientRoute);

/* Post */
AllRoutes.use("/post", postRouter);

/* Categories */
AllRoutes.use("/category", categoryRoute);

export { AllRoutes };
