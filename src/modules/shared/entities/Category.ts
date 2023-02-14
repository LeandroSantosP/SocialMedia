import { Entity } from "../core/Entity";

interface CategoryProps {
  name: string;
  description?: string;
  slug: string;
}

export class Category extends Entity<CategoryProps> {
  private constructor(props: CategoryProps) {
    super(props);
  }

  get slug() {
    return this.props.slug;
  }

  static findUnique(slug: string) {
    return slug;
  }

  static create(props: CategoryProps, id?: string) {
    const category = new Category(props);
    return category;
  }
}
