import { CategoryDTO } from "modules/shared/dtos/CategoryDTO";

export type CAtegoryAndPostResponse = CategoryDTO & {
  CategoriesOnPosts: {
    post: {
      title: string;
      visible: boolean;
      authorId: number;
      content: string | null;
    };
  }[];
};
