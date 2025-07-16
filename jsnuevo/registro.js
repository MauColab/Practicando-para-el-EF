document.getElementById('formRegistro').addEventListener('submit', function(e) {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value.trim();
    const autor = document.getElementById('autor').value.trim();
    const cat = document.getElementById('categoria').value.trim();
    const paginas = parseInt(document.getElementById('numero').value, 10);
    const descripcion = document.getElementById('descripcion').value.trim();

    if (!titulo || !autor || !cat || !paginas || !descripcion){
        alert("Todos los campos son obligatorios");
        return;
    }

    const libros = obtenerDatos();
    const nuevoDato = {
        titulo,
        autor,
        categoria: cat,
        paginas,
        descripcion,
        comentarios:[]
    };

    libros.push(nuevoDato);
    localStorage.setItem('datos', JSON.stringify(libros));

    document.getElementById('mensaje').textContent = "Libro registrado correctamente";

});

function chau(){
    window.location.href = "buscar.html";
}