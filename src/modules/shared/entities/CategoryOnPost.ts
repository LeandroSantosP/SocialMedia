import { Entity } from "../core/Entity";

interface CategoryOnPostProps {
  categoryId: string;
  postId: string;
}

export class CategoryOnPost extends Entity<CategoryOnPostProps> {
  private constructor(props: CategoryOnPostProps) {
    super(props);
  }

  static create(props: CategoryOnPostProps) {
    const category = new CategoryOnPost(props);
    return category;
  }
}
