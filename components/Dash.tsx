import { Head } from "./Home";

export default function Dash({
  email,
  picture,
}: {
  email?: string;
  picture?: string;
}) {
  return (
    <html>
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
      <article class="flex flex-col justify-center items-center min-h-screen bg-indigo-200">
        <h2 class="text-6xl font-bold">Tu perfil</h2>
        <img
          src={
            picture ||
            "https://pbs.twimg.com/profile_images/1562960963359293446/rGjvMLR1_400x400.jpg"
          }
          alt="avatar"
        />
        <p class="text-4xl">{email}</p>
        <form>
          <button
            name="intent"
            value="logout"
            class="py-2 px-4 rounded-md bg-indigo-500 text-white my-4 hover:bg-indigo-600"
          >
            Cerrar sesión
          </button>
        </form>
      </article>
    </html>
  );
}
