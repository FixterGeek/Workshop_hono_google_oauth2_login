import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";
import Home from "./components/Home";

const app = new Hono();

app.get("/*", serveStatic({ root: "./" }));
app.get("/", (c) => {
  return c.html(<Home />);
});

export default app;
