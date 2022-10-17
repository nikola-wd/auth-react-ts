import { useState, useEffect, useRef } from 'react';
import { AxiosError } from 'axios';
import useAxiosPrivate from './useAxiosPrivate';
import { RequestMethod } from '../utils/request-method.enum';
import { CustomRequestType } from './types';

type CustomResponseError = {
  statusCode: number;
  message?: string;
  error?: string;
};

const useOnRenderRequest = <T, M>(props: CustomRequestType<T, M>) => {
  const { url, method = RequestMethod.GET, config = {} } = props;

  if (props?.data) {
    config.data = props.data;
  }

  const axiosPrivate = useAxiosPrivate();

  const effectRan = useRef<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<CustomResponseError>();
  const [data, setData] = useState<T | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();

    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      console.log(
        'Should fetch in useOnRenderHook here________________________________________',
      );

      config.signal = controller.signal;

      (async () => {
        try {
          setIsLoading(true);
          const res = await axiosPrivate[method](url, config);

          if (!res?.headers['content-type']?.startsWith('application/json')) {
            // TODO: Maybe create custom errors and exceptions

            throw new AxiosError('API route not found', 'ERR_BAD_REQUEST');
          }

          console.log(res);
          console.log(res.status);

          setData(res.data);
          setIsSuccess(true);
        } catch (err) {
          const error = err as CustomResponseError;
          console.log(err);

          console.log('404 from server error: ', err);
          setError(error);
          setIsError(true);
        } finally {
          setIsLoading(false);
          setIsFinished(true);
        }
      })();
    }

    return () => {
      // TODO: Maybe abort controller should be added inside axiosPrivate
      effectRan.current = true;
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    isFinished,
  };
};

export default useOnRenderRequest;
