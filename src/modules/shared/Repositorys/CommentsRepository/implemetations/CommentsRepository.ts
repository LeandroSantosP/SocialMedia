import { prisma } from "../../../../prisma/client";
import { CommentDTO } from "../../../dtos/CommentsDTO";
import {
  CommentsRepositoryContract,
  IRequestCreateComment,
} from "../comment-repository-contract";

export class CommentsRepository extends CommentsRepositoryContract {
  async GetAllComments(): Promise<CommentDTO[]> {
    const allComments = await prisma.comment.findMany();

    return allComments;
  }
  async create({
    authorId,
    authorName,
    comment,
    postId,
  }: IRequestCreateComment): Promise<void> {
    await prisma.comment.create({
      data: {
        authorName,
        comment,
        author: {
          connect: {
            id: authorId,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
    });
  }
}
