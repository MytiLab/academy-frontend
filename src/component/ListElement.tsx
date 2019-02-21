import * as React from 'react';
import { Unit } from 'src/types/Unit';
import '../styles/menu.css';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library , IconDefinition} from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle,faExclamation,faCheck,faTemperatureLow,faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';

interface IListElementProps{
   unit:Unit
}


export class ListElement extends React.Component< IListElementProps>{

    constructor(props: IListElementProps){
        super(props);
        library.add(faExclamation,faCheck,faExclamationTriangle);
    }
   

    render() {
        
        let state=this.props.unit.description;
        let iconType="check";
        let iconColor="green";
        let description;
        let freshmodIconStyle:string;
        if(state){
            let st=JSON.parse(state)
            console.log(state);
            iconColor="icon-"+st.color;
            iconType=st.icon;
            description=st.description;
            freshmodIconStyle="freshmod-icon-red";
         }else{
             iconType="check";
             iconColor="icon-green";
             description="Ok";
             freshmodIconStyle="freshmod-icon-green";
         }

        
        let id:string="/unit/"+this.props.unit.id+"/detail";
        let icona:IconDefinition=faCheck;
        switch(iconType){
            case "check":
                icona=faCheck;
                break;
            case "exclamation":
                icona=faExclamation;
                break;
            case "exclamation-triangle":
                 icona=faExclamationTriangle;
            default:break;
        }
        var freshmodIcon=require('../icon.png');
        // var freshmodIconStyle:string="";
        // if(this.props.unit.important==0){
        //     freshmodIconStyle="freshmod-icon-green";
        // }else{
        //     freshmodIconStyle="freshmod-icon-red";
        // }
        return(
            <li className="nav-item item">
               <div>    
                <div className="unita">
                   <img src={freshmodIcon} className={freshmodIconStyle}/><Link to={id} className="link">{this.props.unit.name}</Link> 
                    
                </div>   
                <div id="detail">
                    <div className="unita-half">
                        <span className={iconColor}><FontAwesomeIcon icon={icona}/></span>
                        <span className="event-type">{description}</span>
                    </div>
                    <div className="half">
                        <div className="unita-half">
                            <span className="temperatureLow"><FontAwesomeIcon icon={faTemperatureLow}/></span>
                            <span className="temp">{this.props.unit.min}</span>
                        </div>
                        <div className="unita-half">
                            <span className="temperatureHigh"><FontAwesomeIcon icon={faTemperatureHigh}/></span>
                            <span className="temp">{this.props.unit.max}</span>
                        </div> 
                    </div>
                </div>
              
               </div>
            </li>
            );

    }


}