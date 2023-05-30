export default function Home() {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="styles/style.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <title>Login</title>
      </head>
      <body>
        <nav class="flex items-center">
          <img
            class="w-20 p-4"
            src="https://s3-eu-west-1.amazonaws.com/tpd/logos/5be01d787b5e5b0001ebb6bb/0x0.png"
            alt=""
          />
          <h2 class="text-2xl font-light">Fixtergeek</h2>
        </nav>
        <article class="md:flex-row flex flex-col px-8 justify-center py-20 gap-12">
          <section>
            <h1 class="text-4xl font-bold text-gray-800">
              Comienza hoy mismo <br />y actualízate.
            </h1>
            <p class="py-4 text-gray-500 max-w-[400px] text-lg">
              Abre tu sesión a través de tu cuenta de Google. De esta forma tus
              datos siempre están seguros y no hay contraseñas qué recordar. 🤯
            </p>
            <button class="bg-green-700 py-2 px-4 rounded-md text-white text-lg hover:bg-green-600">
              <i class="fa-brands fa-google"></i>
              Inicia sesión con Google
            </button>
          </section>
          <section class="text-gray-500">
            <h3 class="uppercase text-sm mb-2">
              Comienza con una cuenta gratuita
            </h3>
            <ul class="grid gap-3 list-disc list-inside">
              <li>Acceso a todos los micro-cursos por 1 año</li>
              <li>Accesso a mentorías 1:1 con bliss, ilimitadas.</li>
              <li>Accesso a cualquier curso en vivo gratis</li>
              <li>Accesso a todas las learnings</li>
              <li>Descarga de videos de sesiones en vivo</li>
              <li>Descarga de cualquier curso en formato .mp4</li>
              <li>Code review de tus proyectos en Github.</li>
            </ul>
          </section>
        </article>
      </body>
    </html>
  );
}
