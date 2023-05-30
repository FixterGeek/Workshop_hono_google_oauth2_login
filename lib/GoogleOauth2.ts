export const getExtraData = (access_token: string | undefined) => {
  if (!access_token) return { ok: false, error: "No token" };
  const url = "https://www.googleapis.com/oauth2/v2/userinfo";
  return fetch(url, {
    headers: {
      Authorization: "Bearer " + access_token,
    },
  })
    .then((r) => r.json())
    .catch((e) => ({ ok: false, error: e }));
};

export const getAccessToken = (code: string, env: any) => {
  const url =
    "https://oauth2.googleapis.com/token?" +
    new URLSearchParams({
      code,
      client_secret: env.GOOGLE_SECRET,
      grant_type: "authorization_code",

      client_id: env.GOOGLE_CLIENT_ID,
      redirect_uri:
        env.ENV === "development"
          ? "http://localhost:8787"
          : "https://hono-login.blissmo.workers.dev",
      response_type: "code",
      scope: "https://www.googleapis.com/auth/userinfo.email",
    });
  return fetch(url, {
    method: "post",
    headers: { "content-type": "application/json" },
  })
    .then((r) => r.json())
    .catch((e) => ({ ok: false, error: e }));
};

export const reidrectToGoogle = (redirect: any, env: any) => {
  const url =
    "https://accounts.google.com/o/oauth2/auth?" +
    new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      redirect_uri:
        env.ENV === "development"
          ? "http://localhost:8787"
          : "https://hono-login.blissmo.workers.dev",
      response_type: "code",
      scope: "https://www.googleapis.com/auth/userinfo.email",
    });

  return redirect(url);
};
