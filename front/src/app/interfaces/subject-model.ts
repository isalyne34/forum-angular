export interface SubjectModel {
  title: string;
  id?: string;
  created_by?: string;
  postCount?: number | null;
  lastPostDate?: string | null;
}
