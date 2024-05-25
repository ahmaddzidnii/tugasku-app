import { StatusCode } from "hono/utils/http-status";

interface ResponseData<T> {
  took: number;
  status: StatusCode;
  type?: string;
  data: T | null;
  errors: T | null;
}

export const createResponse = <T>(template: ResponseData<T>): ResponseData<T> => {
  const { took, type, status, data, errors } = template;
  return {
    took,
    status,
    type,
    data,
    errors,
  };
};
