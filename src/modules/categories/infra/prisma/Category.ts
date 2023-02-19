import { Entity } from "../../../shared/core/Entity";
import { CategoryDTO } from "../../../shared/dtos/CategoryDTO";

export class Category extends Entity<CategoryDTO> {
  private constructor(props: CategoryDTO) {
    super(props);
  }

  get slug() {
    return this.props.slug;
  }

  static findUnique(slug: string) {
    return slug;
  }

  static create(props: CategoryDTO, id?: string) {
    const category = new Category(props);
    return category;
  }
}
