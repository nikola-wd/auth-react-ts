import { useState, useEffect, useRef } from 'react';
import { AxiosError } from 'axios';
import useAxiosPrivate from './useAxiosPrivate';
import { RequestMethod } from '../utils/request-method.enum';
import { CustomRequestType } from './types';

const useMutationRequest = <T>() => {
  const axiosPrivate = useAxiosPrivate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError>();
  const [data, setData] = useState<T | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [abortRequest, setAbortRequest] = useState<boolean>(false);

  const cancelRequest = (): void => setAbortRequest(true);

  const controller = useRef<AbortController>(new AbortController());

  const mutate = async <T, M>(props: CustomRequestType<T, M>) => {
    const { url, method = RequestMethod.GET, config = {} } = props;

    config.signal = controller.current.signal;

    try {
      console.log(
        'Should run mutation hook here________________________________________',
      );
      setIsLoading(true);

      // const res = await axiosPrivate[method](...reqAttrs);

      let reqSettings: CustomRequestType<T, M> = {
        method,
        url,
        config,
      };

      if (props?.data) {
        reqSettings.data = props.data;
      }

      const res = await axiosPrivate(reqSettings);

      if (!res?.headers['content-type']?.startsWith('application/json')) {
        // TODO: Maybe create custom errors and exceptions

        throw new AxiosError('API route not found', 'ERR_BAD_REQUEST');
      }

      console.log(res);
      console.log(res.status);

      setData(res.data);
      setIsSuccess(true);
    } catch (err) {
      const error = err as AxiosError;
      console.log(err);

      console.log('404 from server error: ', err);
      setError(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
      setIsFinished(true);
    }
  };

  useEffect(() => {
    console.log(
      'Should register mutate hook here________________________________________',
    );

    if (abortRequest) {
      console.log('Should abort mutate hook here__________________________');
      controller.current.abort();
    }
    return () => {
      console.log(
        'Should reset abort controller mutate hook here__________________________',
      );
      controller.current = new AbortController();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abortRequest]);

  return {
    mutate,
    cancelRequest,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    isFinished,
  };
};

export default useMutationRequest;
