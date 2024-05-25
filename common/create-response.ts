import { StatusCode } from "hono/utils/http-status";

interface ResponseData<T> {
  took_time: number;
  status: StatusCode;
  type?: string;
  data: T | null;
  errors: T | null;
}

export const createResponse = <T>(template: ResponseData<T>): ResponseData<T> => {
  const { took_time, type, status, data, errors } = template;
  return {
    took_time,
    status,
    type,
    data,
    errors,
  };
};
