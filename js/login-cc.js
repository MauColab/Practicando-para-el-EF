document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita recarga automática

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value;

    if (!nombre || !correo || !password) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const nuevoUsuario = {
      nombre: nombre,
      correo: correo,
      password: password
    };

    let usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios));

    // Marcar sesión activa
    localStorage.setItem("usuarioActual", JSON.stringify(nuevoUsuario));
    console.log("Usuario creado exitosamente:", nuevoUsuario);

    // Redirigir a index.html
    window.location.href = "index.html";
  });
});