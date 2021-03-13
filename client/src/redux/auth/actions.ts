export const actionLogin = (token: string) =>
  ({ type: "auth/LOG_IN", payload: { token } } as const);
export const actionLoginFailed = (error: string) =>
  ({ type: "auth/LOG_IN_FAILED", payload: { error } } as const);
export const authenticate = (email: string, password: string) =>
  ({ type: "auth/AUTHENTICATE", payload: { email, password } } as const);
export const actionLogout = () => ({ type: "auth/LOG_OUT" } as const);
