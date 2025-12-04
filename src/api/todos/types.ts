export type GetTodosParams = {
  page: number;
  limit: number;
  userId: string;
  completed?: boolean;
};
