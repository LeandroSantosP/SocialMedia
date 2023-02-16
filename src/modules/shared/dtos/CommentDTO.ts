export type CommentDTO = {
  id: string;
  authorName: string;
  comment: string;
  postId: string;
  authorId: number;
  created_at: Date;
  updated_At: Date;
};
