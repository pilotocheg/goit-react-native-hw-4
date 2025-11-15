import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import Toast from 'react-native-toast-message';

import { TodoItem } from './dto';

const api = axios.create({
  baseURL: 'https://69172ae0a7a34288a27fc725.mockapi.io/',
});

type RequestOptions = AxiosRequestConfig & {
  errorTitle: string;
  shouldShowToast?: (error: AxiosError) => void;
};

const makeRequest = async <T>(
  url: string,
  { errorTitle, shouldShowToast, ...options }: RequestOptions,
) => {
  try {
    const response = await api.request<T>({
      url,
      ...options,
    });
    return response.data;
  } catch (error) {
    if (shouldShowToast?.(error as AxiosError)) {
      Toast.show({
        type: 'error',
        text1: errorTitle,
        text2: (error as AxiosError).message,
      });
    }
    console.error(`${errorTitle}:`, error);
    throw error;
  }
};

type GetTodosParams = {
  page: number;
  limit: number;
  completed?: boolean;
};

export const getTodos = (params: GetTodosParams) => {
  const { page, limit, completed } = params;

  const queryParams: AxiosRequestConfig['params'] = {
    page,
    limit,
    sortBy: 'createdAt',
    order: 'desc',
  };
  if (completed !== undefined) {
    queryParams.completed = completed;
  }
  return makeRequest<TodoItem[]>('/todos', {
    errorTitle: 'Failed to load todos',
    params: queryParams,
    shouldShowToast: error => error.response?.status !== 404,
  });
};

export const createTodo = async (todo: Omit<TodoItem, 'id'>) => {
  return makeRequest<TodoItem>('/todos', {
    errorTitle: 'Failed to create todo',
    method: 'POST',
    data: todo,
  });
};

export const updateTodo = async (todo: Partial<TodoItem>) => {
  return makeRequest<TodoItem>(`/todos/${todo.id}`, {
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
