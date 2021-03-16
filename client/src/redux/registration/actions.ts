export const actionRegister = (
  name: string,
  email: string,
  password: string,
  avatar: string
) =>
  ({
    type: "register/AUTHENTICATE",
    payload: { name, email, password, avatar },
  } as const);

export const actionSetAvatar = (avatar: string | undefined) =>
  ({
    type: "register/SETAVATAR",
    payload: { avatar },
  } as const);
