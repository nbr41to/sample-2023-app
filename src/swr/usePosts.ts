import { Post } from '@prisma/client';
import axios from 'axios';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

const fetcher = async (url: string) => {
  /* 疑似遅延 */
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await axios.get(url);

  return res.data;
};

const sendRequest = async (url: string, data: { arg: Post }) => {
  /* 疑似遅延 */
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await axios.post(url, data.arg);

  return res.data;
};

export const usePosts = () => {
  const { data, isLoading, error, isValidating, mutate } = useSWR<Post[]>(
    '/api/posts',
    fetcher,
  );
  const {
    data: mutateData,
    trigger,
    isMutating,
    error: mutateError,
    reset: resetMutate, // (data, error, isMutating)をreset
  } = useSWRMutation<Post>('/api/posts', sendRequest);

  console.log({
    data,
    isLoading,
    error,
    trigger,
    isMutating,
    mutateError,
  });

  return {
    data,
    isLoading,
    error,
    trigger,
    isMutating,
    mutateError,
  };
};
