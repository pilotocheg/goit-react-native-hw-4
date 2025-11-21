import { createSlice } from '@reduxjs/toolkit';

import { TodosFilter, TodosState } from './types';
import {
  createTodoThunk,
  fetchTodosThunk,
  toggleCompletedThunk,
} from './thunks';

const initialState: TodosState = {
  todos: [],
  page: 1,
  allLoaded: false,
  loading: false,
  filter: TodosFilter.ALL,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    resetState: () => initialState,
    resetTodos: state => {
      state.todos = [];
      state.page = 1;
      state.allLoaded = false;
      state.loading = false;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTodosThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchTodosThunk.fulfilled, (state, action) => {
      const { todos, page, allLoaded } = action.payload;
      state.todos = [...state.todos, ...todos];
      state.loading = false;
      state.page = page;
      state.allLoaded = allLoaded;
    });
    builder.addCase(fetchTodosThunk.rejected, state => {
      state.loading = false;
    });
    builder.addCase(createTodoThunk.fulfilled, (state, action) => {
      if (state.filter !== TodosFilter.COMPLETED) {
        state.todos.unshift(action.payload);

        if (!state.allLoaded) {
          // if not all todos are loaded, we need to remove the last item to keep the pagination consistent
          state.todos.pop();
        }
      }
    });
    builder.addCase(toggleCompletedThunk.fulfilled, (state, action) => {
      const todoIndex = state.todos.findIndex(t => t.id === action.payload.id);
      if (todoIndex !== -1) {
        state.todos[todoIndex] = action.payload;
      }
    });
  },
  selectors: {
    selectTodos: state => state.todos,
    selectFilter: state => state.filter,
    selectLoading: state => state.loading,
    selectPage: state => state.page,
    selectAllLoaded: state => state.allLoaded,
  },
});
