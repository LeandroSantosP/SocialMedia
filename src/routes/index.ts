import { Router } from "express";
import { adminRoutes } from "./admin";
import { authenticationRoutes } from "./authetication.routes";
import { categoryRoute } from "./categories";
import { clientRoute } from "./Client";
import { postRouter } from "./post.routes";
import { ReviewRouter } from "./Review";

const AllRoutes = Router();

/* Admin */
AllRoutes.use("/admin", adminRoutes);

/* Client */
AllRoutes.use("/client", clientRoute);

/* Review */

AllRoutes.use("/review", ReviewRouter);

/* Post */
AllRoutes.use("/post", postRouter);

/* Categories */
AllRoutes.use("/category", categoryRoute);

/* Authentication */
AllRoutes.use(authenticationRoutes);

export { AllRoutes };
