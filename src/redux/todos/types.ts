import { TodoItem } from '../../api/todos/dto';

export enum TodosFilter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export type TodosState = {
  todos: TodoItem[];
  page: number;
  allLoaded: boolean;
  loading: boolean;
  filter: TodosFilter;
};
