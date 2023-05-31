# Server side Google Oauth2 con Hono y Cloudflare workers

![hono logo](https://raw.githubusercontent.com/honojs/hono/main/docs/images/hono-title.png)

El consumo del API de Google como proveedor del servicio se hace por medio de `fetch` y se han creado 3 funciones que nos ayudan a administrar estas peticiones, pero que al mismo tiempo son fáciles de leer, ya que se evita la sintaxis `async/await`.

Los estilos están relajados. Aún aprendiendo.

```jsx
// lib/GoogleOauth2.ts
export const getExtraData
export const getAccessToken
export const reidrectToGoogle
```

## RequestHandler
El archivo principal en Hono funcionará como nuestro worker y capturaremos los callbacks para recibir y pasar los tokens de Google a las funciones antes mencionadas.

```jsx
  if (intent === "logout") {		// 4
  if (cookie) {						// 3
  if (code) {						// 2
  if (intent === "google-login") {  // 1
```
Cada uno capturando un momento consecutivo del flujo total, utilizando únicamente peticiones GET. 

> 👀 Puedes cambiar a peticiones POST o PUT, yo solo preferí la simplicidad de una sola ruta y sin necesidad de parsear un body.

## JSX
Gracias a que Hono nos permite emplear JSX sin necesidad de configurar nada más, que una cosa: los archivos deben tener extensión, `.tsx` lo que me hace todo el sentido, así que asegúrate de que tu  archivo `server.entry.tsx` termine con `.tsx` o `.jsx` 

Además de que hemos creado una carpeta `components` donde podremos crear componentes JSX sin necesidad de instalar React.  ¿Genial no? 😲 ahora podemos reutilizar mucho más. 🧩

```jsx
<Home />
<Dash />
```
Estos componentes son muy ruidosos, seguro tú podrías hacerlos mejor, yo no les puse mucha atención. 😉

## Finalmente Cloudflare
Todo el trabajo realizado hasta ahora no ha sido por otra razón más que para publicar una aplicación JamStack. 

Así que vamos a configurar un par de cosas para lograr publicar nuestro worker.

### Variables de entorno
En el archivo `wrangler.toml` necesitamos colocar un bucket para nuestros estáticos y también definir las variables de entorno.

```jsx
name = "hono-login"
main = "server.entry.tsx"
compatibility_date = "2023-01-01"

[site]
bucket = "./public"

[vars]
GOOGLE_CLIENT_ID="325591888601-hapgr9g06vuqms8bp50rga6r60d10mb4.apps.googleusercontent.com"
GOOGLE_SECRET="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"
ENV="production"
```
Los workers de Cloudflare no tienen acceso a un entorno como un container o una máquina virtual, por eso las variables son pasadas en el contexto.

```jsx
// call
await getAccessToken(code, c.env)

// declaration
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
```
`env.GOOGLE_SECRET` y `env.GOOGLE_CLIENT_ID`vienen del contexto.

Con tu sesión de Cloudflare abierta bastará con hacer:

`npm run deploy`

Que a su vez ejecuta:

```bash
wrangler deploy --minify server.entry.tsx
```

¡Y ya está, estás en producción! 🤯

Disfrúta la lectura y no dejes de [suscribirte](https://fixtergeek.com/subscribe)

Abrazo. Bliss. 🤓
