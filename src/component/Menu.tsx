import * as React from 'react';
import { List } from './List';
import { Unit } from 'src/types/Unit';
import '../styles/menu.css';

interface IMenuProps{
    listaUnit:Array<Unit>
  }

export class Menu extends React.Component<IMenuProps>{
    
    constructor(props:IMenuProps) {
        super(props);
    }

    render(){
        return(
            <div className="menu">
                <div className="menu-title">
                    <span className="units-header">UNITS</span>
                </div>    
                
                <div>
                    <List listaUnit={this.props.listaUnit}/> 
                </div>
            </div>
           
        );
    }

}