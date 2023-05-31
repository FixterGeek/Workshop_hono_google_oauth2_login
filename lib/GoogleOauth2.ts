const prodURL = "";

export type EnvObject =
  | {
      GOOGLE_CLIENT_ID?: string;
      GOOGLE_SECRET?: string;
      ENV?: string;
    }
  | undefined;

type ResultResponse =
  | {
      ok: false;
      error?: Error;
      access_token?: string;
    }
  | Record<string, any>;

type ExtraDataReturn = Promise<ResultResponse | Record<string, any>>;

export const getExtraData = (access_token: string): ExtraDataReturn => {
  const url = "https://www.googleapis.com/oauth2/v2/userinfo";
  return fetch(url, {
    headers: {
      Authorization: "Bearer " + access_token,
    },
  })
    .then((r) => r.json())
    .catch((e) => ({ ok: false, error: e })) as ExtraDataReturn;
};

export const getAccessToken = async <
  Code extends string,
  Env extends EnvObject
>(
  code: Code,
  env: Env
): ExtraDataReturn => {
  if (!env || !env.GOOGLE_SECRET || !env.GOOGLE_CLIENT_ID)
    return new Error("missing env object");
  const url =
    "https://oauth2.googleapis.com/token?" +
    new URLSearchParams({
      code,
      client_secret: env.GOOGLE_SECRET,
      grant_type: "authorization_code",
      client: env.GOOGLE_CLIENT_ID,
      redirect_uri:
        env.ENV === "production" ? prodURL : "http://localhost:8787",
      scope: "https://www.googleapis.com/auth/userinfo.email",
    });
  return fetch(url, {
    method: "post",
    headers: { "contant-type": "application/json" },
  })
    .then((r) => r.json())
    .catch((e) => ({ ok: false, error: e })) as ResultResponse;
};

export function redirectToGoogle<
  Redirect extends (arg0: string) => Response,
  Env extends EnvObject
>(redirect: Redirect, env: Env): Response {
  if (!env || !env.GOOGLE_SECRET || !env.GOOGLE_CLIENT_ID)
    throw new Error("Missing env object");
  const obj = {
    client_id: env.GOOGLE_CLIENT_ID,
    redirect_uri: env.ENV === "production" ? prodURL : "http://localhost:8787",
    response_type: "code",
    scope: "https://www.googleapis.com/auth/userinfo.email",
  };
  const url =
    "https://accounts.google.com/o/oauth2/auth?" + new URLSearchParams(obj);
  return redirect(url);
}
