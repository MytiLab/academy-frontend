//modello dello state dell'applicazione

import {Unit} from './Unit';

export class StateModel{
    lista:Array<Unit>;
    selected:Unit;
    mounted:boolean
}