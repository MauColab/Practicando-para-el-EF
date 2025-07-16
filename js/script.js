//import {Movimiento} from './movimiento.js'
class Movimiento{
    constructor(description, amount, type){
        this.description = description;
        this.amount = amount;
        this.type = type; // 'ingreso' or 'gasto'
    }
}

const form = document.getElementById('movementForm');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const errorMsg = document.getElementById('error');
const filterType = document.getElementById('filterType');
const movementList = document.getElementById('movementList');
const totalIngresos = document.getElementById('totalIngresos');
const totalGastos = document.getElementById('totalGastos');
const balance = document.getElementById('totalBalance');

const cargarMovimientos = () => {
    const datos = localStorage.getItem('movimientos');
    return datos ? JSON.parse(datos) : [];
}

let movimientos = cargarMovimientos();

const guardarMovimientos = () => {
    localStorage.setItem('movimientos', JSON.stringify(movimientos));
}

const renderizarMovimientos = () => {
    const filtro = filterType.value;
    movementList.innerHTML = '';

    const filtrados = filtro === 'Todos' ? movimientos
    : movimientos.filter(m => m.type === filtro);

    filtrados.forEach((m) =>{
        const li = document.createElement('li');
        li.textContent  = `${m.description} - S/${m.amount.toFixed(2)} (${m.type})`;

        movementList.appendChild(li);
    });
}

const actualizarResumen = () =>{
    const ingresos = movimientos.filter(m => m.type === 'Ingreso').
    reduce((sum, m) => sum + m.amount, 0);
    // Caso de gasto
    const gastos = movimientos.filter(m => m.type === 'Gastos').
    reduce((sum, m) => sum + m.amount, 0);

    totalIngresos.textContent = ingresos.toFixed(2);
    totalGastos.textContent = gastos.toFixed(2);
    balance.textContent = (ingresos - gastos).toFixed(2);
}

const validarDuplicado = (description, monto, tipo)=> {
    return movimientos.some(
        m => m.description === description && m.amount === monto
        && m.type === tipo
    );
};

const agregarMovimiento = (e) => {
    e.preventDefault();

    const description = descriptionInput.value.trim();
    const monto = parseFloat(amountInput.value);
    const tipo = typeSelect.value;

    if (!description || isNaN(monto) || monto<=0){
        errorMsg.textContent = `Complete los campos correctamente`;
        return;
    }

    if(validarDuplicado(description, monto, tipo)){
        errorMsg.textContent = `Este movimiento ya ha sido registrado`;
        return;
    }

    errorMsg.textContent = '';
    const nuevoMovimiento = new Movimiento(description, monto, tipo);

    movimientos.push(nuevoMovimiento);
    guardarMovimientos();
    form.reset();
    renderizarMovimientos();
    actualizarResumen();
}

form.addEventListener('submit', agregarMovimiento);
filterType.addEventListener('change', renderizarMovimientos);

renderizarMovimientos();
actualizarResumen();