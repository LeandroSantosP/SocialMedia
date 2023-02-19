import { Entity } from "../../../shared/core/Entity";

export interface CreatePostProps {
  title: string;
  visible: boolean;
  authorId: number;
  content?: string;
}

export class Post extends Entity<CreatePostProps> {
  constructor(props: CreatePostProps) {
    super(props);
  }

  static create(props: CreatePostProps) {
    const post = new Post(props);

    return post;
  }
}
