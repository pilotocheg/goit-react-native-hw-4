import { createAsyncThunk } from '@reduxjs/toolkit';

import { createTodo, getTodos, updateTodo } from '../../api/todos';
import { TodoItem } from '../../api/todos/dto';
import { GetTodosParams } from '../../api/todos/types';
import { RootState } from '../store';
import { TodosFilter } from './types';

const PAGE_SIZE = 10;

export const fetchTodosThunk = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { getState }) => {
    const { page, filter } = (getState() as RootState).todos;

    const params: GetTodosParams = {
      page,
      limit: PAGE_SIZE,
      completed:
        filter === TodosFilter.ALL
          ? undefined
          : filter === TodosFilter.COMPLETED,
    };
    const todos = await getTodos(params);

    return {
      todos,
      page: page + 1,
      allLoaded: todos.length < PAGE_SIZE,
    };
  },
);

export const createTodoThunk = createAsyncThunk(
  'todos/createTodo',
  (text: string) =>
    createTodo({
      text,
      completed: false,
      createdAt: Date.now(),
    }),
);

export const toggleCompletedThunk = createAsyncThunk(
  'todos/toggleCompleted',
  (todo: TodoItem) => updateTodo(todo.id, { completed: !todo.completed }),
);
