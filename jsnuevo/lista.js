if (!localStorage.getItem('datos')){
    localStorage.setItem('datos', JSON.stringify(datos));
}

function mostrarLista(datos){
    const contenedor = document.getElementById('ListaTotal');
    contenedor.innerHTML = '';

    if (datos.length === 0){
        contenedor.innerHTML = '<p>No se encontraron libros con esos filtros.</p>';
        return;
    }

    const resumen = {};

    datos.forEach(libro =>{
        let cat = typeof libro.categoria === 'string' ? libro.categoria.trim() : 'Sin categoría';
        if (!resumen[cat]){
            resumen[cat] = 0;
        }
        resumen[cat]++;
    });

    const resumenDiv = document.createElement('div');
    resumen.innerHTML = `<h4>Resumen por categoría:</h4>`;
    for (let cat in resumen){
        resumenDiv.innerHTML += `<strong>${cat}</strong>: ${resumen[cat]} libro(s)<br>`;
    }

    contenedor.appendChild(resumenDiv);

    contenedor.innerHTML += '<hr><h4>Detalles:</h4>';

    // Mostrar libros detalladamente
    datos.forEach(libro => {
        const div = document.createElement('div');
        div.innerHTML = `
            <strong>Título:</strong> ${libro.titulo}<br>
            <strong>Autor:</strong> ${libro.autor}<br>
            <strong>Categoría:</strong> ${libro.categoria}<br>
            <strong>Páginas:</strong> ${libro.paginas}<br>
            <strong>Descripción:</strong> ${libro.descripcion}
            <hr>
        `;
        contenedor.appendChild(div);
    });
}

function obtenerDatosLista(){
    return JSON.parse(localStorage.getItem('datos')) || [];
}

function sinFiltro(){
    document.getElementById('filtroListaC').value = '';
    document.getElementById('filtroListaA').value = '';
    mostrarLista(obtenerDatosLista());
}

function filtroLista() {
    const cat = document.getElementById('filtroListaC').value.trim().toLowerCase();
    const autor = document.getElementById('filtroListaA').value.trim().toLowerCase();

    const filtrados = obtenerDatosLista().filter(libro =>{
        const libroCat = typeof libro.categoria === 'string' ? libro.categoria.toLowerCase() : '';
        const libroAutor = typeof libro.autor === 'string' ? libro.autor.toLowerCase() : '';

        const coincideCat = cat === '' || libroCat.includes(cat);
        const coincideA = autor === '' || libroAutor.includes(autor);

        return coincideCat && coincideA;
    }
    );
    mostrarLista(filtrados);
}

document.addEventListener('DOMContentLoaded', ()=>{
    mostrarLista(obtenerDatosLista());
});