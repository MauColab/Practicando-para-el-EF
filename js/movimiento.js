export class Movimiento{
    constructor(description, amount, type){
        this.description = description;
        this.amount = amount;
        this.type = type; // 'ingreso' or 'gasto'
    }
}