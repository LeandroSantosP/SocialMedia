import { Review } from "@prisma/client";
export interface reviewDTO {
  id?: string;
  iliked: boolean | null;
  postId: string;
  clientId: number;
  created_at?: Date;
  updated_at?: Date;
}
