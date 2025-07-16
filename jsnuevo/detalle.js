document.addEventListener('DOMContentLoaded', () =>{
    const tituloSeleccionado = localStorage.getItem('datoSeleccionado');
    const libros = obteneDatos();
    const libro = libros.find(l => l.titulo === tituloSeleccionado);

    const contenedor = document.getElementById('detalleLibro');
    const listaComentarios = document.getElementById('listaComentarios');

    if (!libro){
        contenedor.innerHTML = '<p>Libro no encontrado</p>';
        return;
    }

    contenedor.innerHTML = `
    <p><strong>Título:</strong>${libro.titulo}</p>
    <p><strong>Autor:</strong>${libro.autor}</p>
    <p><strong>Categoría:</strong> ${libro.categoria}</p>
    <p><strong>Páginas:</strong> ${libro.paginas}</p>
    <p><strong>Descripción:</strong><br> ${libro.descripcion}</p>
    `;

    function mostrarComentarios(){
        listaComentarios.innerHTML ='';
        libro.comentarios.forEach(c =>{
            const li = document.createElement('li');
            li.textContent = c;
            listaComentarios.appendChild(li);
        })
    }

    mostrarComentarios();

    document.getElementById('formComentario').addEventListener('submit', function(e){
        e.preventDefault();
        const nuevoComentario = document.getElementById('comentario').value.trim();
        if(!nuevoComentario) return;

        libro.comentarios.push(nuevoComentario);

        // Actauliza en localStorage
        const index = libros.findIndex(l => l.titulo === libro.titulo);
        if (index !== -1){
            libros[index] = libro;
            localStorage.setItem('datos', JSON.stringify(libros));
        }

        document.getElementById('comentario').value = '';
        mostrarComentarios();
    })
})