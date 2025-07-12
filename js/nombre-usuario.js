window.addEventListener("DOMContentLoaded", function () {
  const usuarioActual = localStorage.getItem("usuarioActual");

  const textoSesion = document.getElementById("nombreUsuario");

  if (usuarioActual) {
    try {
      const usuario = JSON.parse(usuarioActual);
      textoSesion.textContent = usuario.nombre || "Usuario";
    } catch (error) {
      console.warn("Error al interpretar usuarioActual:", error);
      textoSesion.textContent = "Iniciar Sesión";
    }
  } else {
    textoSesion.textContent = "Iniciar Sesión";
  }
});