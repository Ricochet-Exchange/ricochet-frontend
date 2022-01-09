export type Unwrap<T> = T extends (...args: any) => Promise<infer U> ? U : T;
