import { z } from "zod";
import { validator } from "hono/validator";
import { ValidationTargets } from "hono";

import { createResponse } from "@/common/create-response";
interface ValidatorMidlewareProps<T> {
  target: keyof ValidationTargets;
  schema: z.Schema<T>;
}
export const validatorMidleware = <T>(props: ValidatorMidlewareProps<T>) => {
  return validator(props.target, (value, c) => {
    const startTime = performance.now();
    const parsed = props.schema.safeParse(value);
    if (!parsed.success) {
      if (!parsed.success) {
        return c.json(
          createResponse({
            took_time: performance.now() - startTime,
            status: 400,
            type: "ValidationError",
            data: null,
            errors: parsed.error.issues,
          }),
          400
        );
      }
    }
    return parsed.data;
  });
};
