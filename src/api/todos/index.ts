import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import Toast from 'react-native-toast-message';

import { TodoItem } from './dto';
import { GetTodosParams } from './types';

const api = axios.create({
  baseURL: 'https://69172ae0a7a34288a27fc725.mockapi.io/',
});

type RequestOptions = AxiosRequestConfig & {
  errorTitle: string;
  shouldHandleError?: (error: AxiosError) => boolean;
};

const makeRequest = async <T>(
  url: string,
  { errorTitle, shouldHandleError, ...options }: RequestOptions,
) => {
  try {
    const response = await api.request<T>({
      url,
      ...options,
    });
    return response.data;
  } catch (error) {
    if (shouldHandleError?.(error as AxiosError)) {
      Toast.show({
        type: 'error',
        text1: errorTitle,
        text2: (error as AxiosError).message,
      });
      console.error(`${errorTitle}:`, error);
    }
    throw error;
  }
};

export const getTodos = (params: GetTodosParams) => {
  const { page, limit, completed, userId } = params;

  const queryParams: AxiosRequestConfig['params'] = {
    page,
    limit,
    sortBy: 'createdAt',
    order: 'desc',
    userId,
  };
  if (completed !== undefined) {
    queryParams.completed = completed;
  }
  return makeRequest<TodoItem[]>('/todos', {
    errorTitle: 'Failed to load todos',
    params: queryParams,
    shouldHandleError: error => error.response?.status !== 404,
  });
};

export const createTodo = async (todo: Omit<TodoItem, 'id'>) => {
  return makeRequest<TodoItem>('/todos', {
    errorTitle: 'Failed to create todo',
    method: 'POST',
    data: todo,
  });
};

export const updateTodo = async (id: string, todo: Partial<TodoItem>) => {
  return makeRequest<TodoItem>(`/todos/${id}`, {
    errorTitle: 'Failed to update todo',
    method: 'PUT',
    data: todo,
  });
};

export const deleteTodo = async (id: string) => {
  return makeRequest<void>(`/todos/${id}`, {
    errorTitle: 'Failed to delete todo',
    method: 'DELETE',
  });
};
