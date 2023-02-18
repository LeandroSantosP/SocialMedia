export interface CategoryDTO {
  id?: string;
  name: string;
  description: string | null;
  slug: string;
  created_at?: Date;
  updated_At?: Date;
}
