// ¿Qué haremos aquí?
// Asegurarnos de que, luego de que el usuario cree una cuenta, el nombre colocado se muestre cuando dé clic en Crea cuenta y retorne a index.html
// con su nuevo nombre.

// Primero, en index.html, existe id nombreUsuario, que es donde se mostrará el nombre del usuario (por defecto, "Iniciar Sesión").
// Cuando inicie sesión, si el nombre ingresado existe en los registros, se incia sesión sin problemas. En index.html, nombreUsuario se cambia al nombre del usuario.
// Si se ingresa uno que no existe, crea cuenta, y el nombre ingresado se guarda en el localStorage, y aparece en index.html

// Validar si el usuario existe
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita el envío automático

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value;

    const usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

    const usuarioEncontrado = usuarios.find(u =>
      u.nombre === nombre &&
      u.correo === correo &&
      u.password === password
    );

    if (usuarioEncontrado) {
      localStorage.setItem("usuarioActual", JSON.stringify(usuarioEncontrado));
      window.location.href = "index.html"; // Redirige tras iniciar sesión
    } else {
      alert("⚠️ Usuario no encontrado. Por favor, crea una cuenta.");
      window.location.href = "crear-cuenta.html";
    }
  });
});