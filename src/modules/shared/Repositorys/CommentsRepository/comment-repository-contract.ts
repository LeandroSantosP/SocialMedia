import { Comment } from "@prisma/client";
import { CommentDTO } from "../../dtos/CommentsDTO";

export interface IRequestCreateComment {
  authorId: number;
  authorName: string;
  comment: string;
  postId: string;
}

export abstract class CommentsRepositoryContract {
  abstract create({
    authorId,
    authorName,
    comment,
    postId,
  }: IRequestCreateComment): Promise<void>;

  abstract GetAllComments(): Promise<CommentDTO[]>;
}
