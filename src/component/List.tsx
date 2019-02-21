import 'bootstrap/dist/css/bootstrap.min.css';

import {ListElement} from './ListElement';
import * as React from 'react';
import '../styles/menu.css';
import { Unit } from 'src/types/Unit';


interface IListProps{
    listaUnit:Array<Unit>;
}

export class List extends React.Component<IListProps>{
    constructor(props:IListProps){
        super(props);
    }


    render() {
        return (
            <ul className="list">
                {this.props.listaUnit.map(unit => {
                    return <ListElement key={unit.id} unit={unit}/>
                })}
           </ul>
           
        );
    }
}