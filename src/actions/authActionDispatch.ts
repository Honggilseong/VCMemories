export const CREATE_USER = "CREATE_USER";

export interface createUser {
  type: typeof CREATE_USER;
}

export type authActionDispatch = createUser;
