export const actionLoginSuccess = (
  token: string,
  userId: string,
  avatar: string
) => ({ type: "auth/LOG_IN", payload: { token, userId, avatar } } as const);
export const actionLoginFailed = (error: string) =>
  ({ type: "auth/LOG_IN_FAILED", payload: { error } } as const);
export const actionAuthenticate = (email: string, password: string) =>
  ({ type: "auth/AUTHENTICATE", payload: { email, password } } as const);
export const actionLogout = () => ({ type: "auth/LOG_OUT" } as const);

export const actionRemoveErrorMessage = () =>
  ({ type: "auth/REMOVE_ERROR_MESSAGE" } as const);
