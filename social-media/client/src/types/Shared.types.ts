export type UserErrors = { message: string };

export type Payload<K extends string, T> = {
  userErrors: UserErrors[];
} & Record<K, T>;
