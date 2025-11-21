import { todosSlice } from './slice';

export { todosSlice };

export const { resetState, resetTodos, setFilter } = todosSlice.actions;
export const {
  selectTodos,
  selectFilter,
  selectLoading,
  selectPage,
  selectAllLoaded,
} = todosSlice.selectors;

export { TodosFilter } from './types';
