import { prisma } from "../../../../prisma/client";
import { CommentDTO } from "../../../dtos/CommentsDTO";
import {
  CommentsRepositoryContract,
  IRequestCreateComment,
} from "../comment-repository-contract";

export class CommentsRepository implements CommentsRepositoryContract {
  private prisma;

  constructor() {
    this.prisma = prisma;
  }
  async GetAllComments(): Promise<CommentDTO[]> {
    const allComments = await this.prisma.comment.findMany();

    return allComments;
  }
  async create({
    authorId,
    authorName,
    comment,
    postId,
  }: IRequestCreateComment): Promise<void> {
    await this.prisma.comment.create({
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
