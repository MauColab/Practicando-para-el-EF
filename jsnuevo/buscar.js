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

/*
Si quiero filtrar por número
const paginasMin = parseInt(document.getElementById('filtroPaginas').value.trim(), 10);
const filtrados = obtenerDatosLista().filter(libro => {
    const libroCat = typeof libro.categoria === 'string' ? libro.categoria.trim().toLowerCase() : '';
    const libroAutor = typeof libro.autor === 'string' ? libro.autor.trim().toLowerCase() : '';
    const libroPaginas = typeof libro.paginas === 'number' ? libro.paginas : 0;

    const coincideCat = cat === '' || libroCat.includes(cat);
    const coincideAutor = autor === '' || libroAutor.includes(autor);
    const coincidePaginas = isNaN(paginasMin) || libroPaginas >= paginasMin;

    return coincideCat && coincideAutor && coincidePaginas;
});

// Filtrar por rango
HTML: <input type="number" id="filtroPaginasMin" placeholder="Mínimo de páginas">
<input type="number" id="filtroPaginasMax" placeholder="Máximo de páginas">

function filtroLista() {
    const cat = document.getElementById('filtroListaC').value.trim().toLowerCase();
    const autor = document.getElementById('filtroListaA').value.trim().toLowerCase();
    const minStr = document.getElementById('filtroPaginasMin').value.trim();
    const maxStr = document.getElementById('filtroPaginasMax').value.trim();

    const min = parseInt(minStr, 10);
    const max = parseInt(maxStr, 10);

    const filtrados = obtenerDatosLista().filter(libro => {
        const libroCat = typeof libro.categoria === 'string' ? libro.categoria.trim().toLowerCase() : '';
        const libroAutor = typeof libro.autor === 'string' ? libro.autor.trim().toLowerCase() : '';
        const libroPaginas = typeof libro.paginas === 'number' ? libro.paginas : 0;
f
        const coincideCat = cat === '' || libroCat.includes(cat);
        const coincideAutor = autor === '' || libroAutor.includes(autor);
        const coincidePaginasMin = isNaN(min) || libroPaginas >= min;
        const coincidePaginasMax = isNaN(max) || libroPaginas <= max;

        return coincideCat && coincideAutor && coincidePaginasMin && coincidePaginasMax;
    });

    mostrarLista(filtrados);
}
*/