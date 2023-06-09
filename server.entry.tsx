import { Hono, Env, Context } from "hono";
import { serveStatic } from "hono/cloudflare-workers";
import Home from "./components/Home";
import {
  getAccessToken,
  getExtraData,
  redirectToGoogle,
} from "./lib/GoogleOauth2";
import Dash from "./components/Dash";
import { getCookie, setCookie } from "hono/cookie";

const app = new Hono();

type GOOGLEDATA = {
  picture?: string;
  email?: string;
  access_token?: string;
};

app.get("/*", serveStatic({ root: "./" }));
app.get("/", async (c) => {
  const intent = c.req.query("intent");
  const code = c.req.query("code");
  const cookie = getCookie(c, "userId");

  if (intent === "logout") {
    setCookie(c, "userId", "");
    //You can redirect instead of return a Component
    return c.html(<Home />);
  }

  if (cookie) {
    // look up to DB
    return c.html(<Dash email={cookie} />);
  }

  if (code) {
    const data = await getAccessToken<string, Env["Variables"]>(code, c.env);
    // check errors @todo
    const extra = (await getExtraData(data.access_token)) as GOOGLEDATA;
    // @TODO: save/update your user in DB
    // errors @todo
    // set cookie
    setCookie(c, "userId", extra.email as string);
    return c.html(<Dash email={extra.email} picture={extra.picture} />);
  }

  if (intent === "google-login") {
    return redirectToGoogle<Context["redirect"], Context["env"]>(
      c.redirect,
      c.env
    );
  }
  return c.html(<Home />);
});

export default app;
