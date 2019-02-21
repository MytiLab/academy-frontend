import { Event } from 'src/types/Event';
import * as React from 'react';
import '../styles/eventi.css';
interface IEventElementProps{
    id:number;
    event:Event;
}


export class EventElement extends React.Component<IEventElementProps>{
    constructor(props:IEventElementProps){
        super(props);
    }



    render(){
        let value;
        if(this.props.event.type=="Temperature"){
            value=this.props.event.value+"°C";
        }else if(this.props.event.type=="Humidity"){
            value=this.props.event.value+"%";
        }else{
            value=this.props.event.value;
        }
        let type;
        if(this.props.event.type=="end_travel"){
            type="Travel end";
        }else  if(this.props.event.type=="start_travel"){
            type="Travel start";
        }else{
            type=this.props.event.type;
        }
        
        let className="";
        if(this.props.event.important==1){
            className="important-event";
         }
       
        if(this.props.event.value=="Opened"){
            className="opened-event";
        }else if(this.props.event.value=="Closed"){
            className="closed-event";
        }



        return(
            <tr className={className}>
                <td>{this.props.id}</td>
                <td>{type}</td>
                <td>{value}</td>
                <td>{(this.props.event.important==1)? "Yes":""}</td>
                <td>{new Date(this.props.event.timestamp).toLocaleString()}</td>
            </tr>
        );
    }
}