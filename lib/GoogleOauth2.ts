const prodURL = "https://hono-workshop.blissmo.workers.dev/";

type ResultResponse =
  | {
      ok: boolean;
      error?: Error;
    }
  | Record<string, string | boolean>;

type ExtraType = Promise<ResultResponse | Record<string, any>>;

export const getExtraData = (access_token: string | undefined): ExtraType => {
  if (!access_token) return { ok: false, error: new Error("No token") };
  const url = "https://www.googleapis.com/oauth2/v2/userinfo";
  return fetch(url, {
    headers: {
      Authorization: "Bearer " + access_token,
    },
  })
    .then((r) => r.json())
    .catch((e) => ({ ok: false, error: e })) as ExtraType;
};

type TokenData = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: "Bearer";
  id_token: string;
};
type GetAccessToken = Promise<TokenData | ResultResponse>;

export const getAccessToken = (code: string, env: any): GetAccessToken => {
  const url =
    "https://oauth2.googleapis.com/token?" +
    new URLSearchParams({
      code,
      client_secret: env.GOOGLE_SECRET,
      grant_type: "authorization_code",

      client_id: env.GOOGLE_CLIENT_ID,
      redirect_uri:
        env.ENV === "production" ? prodURL : "http://localhost:8787",
      response_type: "code",
      scope: "https://www.googleapis.com/auth/userinfo.email",
    });
  return fetch(url, {
    method: "post",
    headers: { "content-type": "application/json" },
  })
    .then((r) => r.json())
    .catch((e) => ({ ok: false, error: e })) as GetAccessToken;
};

export const reidrectToGoogle = (redirect: any, env: any) => {
  const url =
    "https://accounts.google.com/o/oauth2/auth?" +
    new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      redirect_uri:
        env.ENV === "development" ? "http://localhost:8787" : prodURL,
      response_type: "code",
      scope: "https://www.googleapis.com/auth/userinfo.email",
    });

  return redirect(url);
};
