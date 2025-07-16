if (!localStorage.getItem('datos')){
    localStorage.setItem('datos', JSON.stringify(datos));
}

function obtenerDatos(){
    return JSON.parse(localStorage.getItem('datos')) || [];
}

function mostrarDatos(datos){
    const contenedor = document.getElementById('mostrarTodo');

    if (!contenedor) return;
    contenedor.innerHTML = '';

    datos.forEach(d => {
        const div = document.createElement('div');
        div.innerHTML = `
        <strong>${d.titulo}</strong> - ${d.autor}<br>
        <button onclick="verDetalle('${d.titulo}')">Ver Detalle</button>
        <hr>
        `;

        contenedor.appendChild(div);
    });
}

function verDetalle(titulo){
    localStorage.setItem('datoSeleccionado', titulo);
    window.location.href = 'detalle.html';
}

function filtrar(){
    const autor = document.getElementById('autor2').value.toLowerCase();
    const libros = obtenerDatos().filter(l => l.autor.toLowerCase().includes(autor));
    mostrarDatos(libros);
}

function mostrarOriginal(){
    document.getElementById('autor2').value='';
    mostrarDatos(obtenerDatos());
}

document.addEventListener('DOMContentLoaded', () =>{
    mostrarDatos(obtenerDatos());
}
)