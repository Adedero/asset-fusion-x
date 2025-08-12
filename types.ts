/* eslint-disable @typescript-eslint/no-unsafe-function-type */
export type Primitive = string | number | boolean | null;

export type Serialize<T> = T extends Function
  ? never // functions can't be serialized
  : T extends symbol
    ? never // symbols can't be serialized
    : T extends undefined
      ? never // undefined is skipped in JSON
      : T extends Primitive
        ? T // keep primitives as-is
        : T extends Date
          ? string // Date becomes ISO string
          : T extends Array<infer U>
            ? Serialize<U>[] // serialize array elements
            : T extends object
              ? {
                  [K in keyof T as T[K] extends Function | symbol | undefined
                    ? never
                    : K]: Serialize<T[K]>;
                }
              : never;
