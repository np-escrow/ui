import { getWebAppFromGlobal } from "../helpers/getWebAppFromGlobal";

export const getToken = () => {
  const telegramId = getWebAppFromGlobal()?.initDataUnsafe?.user?.id;
  const key = `${telegramId}_accessToken`;
  const fromSessionStorage = sessionStorage.getItem(key);
  return fromSessionStorage;
};

export const setToken = (token: string) => {
  const telegramId = getWebAppFromGlobal()?.initDataUnsafe?.user?.id;
  const key = `${telegramId}_accessToken`;
  sessionStorage.setItem(key, token);
};
