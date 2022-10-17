import { useState, useEffect, useRef } from 'react';
import { AxiosError } from 'axios';
import useAxiosPrivate from './useAxiosPrivate';
import { RequestMethod } from '../utils/request-method.enum';
import { CustomRequestType } from './types';

// TODO: Maybe this type exists and move to types
type CustomResponseErrorType = {
  statusCode: number;
  message?: string;
  error?: string;
};

class CustomResponseError {
  statusCode: number;
  message?: string;
  error?: string;

  constructor(errorOBJ: CustomResponseErrorType) {
    this.statusCode = errorOBJ?.statusCode;
    this.message = errorOBJ?.message;
    this.error = errorOBJ?.error;
  }
}

const useMutationRequest = <T>() => {
  const axiosPrivate = useAxiosPrivate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<CustomResponseError>();
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
      console.log(res);

      if (res.status === 201 || res.status === 204) {
        setIsSuccess(true);
        return;
      }

      if (!res?.headers['content-type']?.startsWith('application/json')) {
        // TODO: Maybe create custom errors and exceptions

        throw new CustomResponseError({ statusCode: 404 });
      }

      if (res?.data) {
        setData(res.data);
        setIsSuccess(true);
      }
    } catch (err) {
      const axErr = err as AxiosError;
      // const error = err;
      const error = err as CustomResponseError;

      if (axErr.response?.data) {
        console.log('catch: ', axErr.response!.data);

        // TODO: definitelly refactor this and standardize errors
        const finalError = new CustomResponseError(
          axErr.response!.data as CustomResponseError,
        );
        setError(finalError);
      } else {
        setError(error);
      }

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
