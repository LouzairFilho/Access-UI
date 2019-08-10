import { Sort } from './Sort';

export class Page {
    content:[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: Sort[];
    first: boolean;
    numberOfElements: number;

    constructor(numero:number, tamanho:number){
        this.number = numero;
        this.size = tamanho;
    }
}


