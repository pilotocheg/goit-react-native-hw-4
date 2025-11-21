import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { todosSlice } from './todos';

const rootSlice = combineSlices(todosSlice);

export type RootState = ReturnType<typeof rootSlice>;

export const store = configureStore({
  reducer: rootSlice,
});

export type AppDispatch = typeof store.dispatch;
