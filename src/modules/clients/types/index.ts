export interface AllPostReturnProps {
  id: string;
  title: string;
  content: string | null;
  created_at: Date;
  authorId: number;
  comments: {
    id: string;
    created_at: Date;
    authorName: string;
    comment: string;
    authorId: number;
  }[];
  IsPublished: boolean;
  IsActive: boolean;
  updated_At: Date;
}

export interface PostUniqueReturnProps {
  name: string;
  bio: string | null;
  avatar_url: string | null;
  posts: {
    title: string;
    IsPublished: boolean;
    content: string | null;
    visible: boolean;
    created_at: Date;
    comments: {
      id: string;
      created_at: Date;
      authorName: string;
      comment: string;
      authorId: number;
    }[];
  }[];
  id: number;
}
