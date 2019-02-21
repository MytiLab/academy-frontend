import * as React from 'react';
import {Event} from '../types/Event';
import {EventElement} from './EventElement';
import * as ApiService from '../ApiService';
import { Unit } from 'src/types/Unit';
import { AxiosResponse } from 'axios';
import { Travel } from 'src/types/Travel';
import Dropdown from 'react-bootstrap/Dropdown';
import '../styles/eventi.css';


interface IEventiProps{
    unit:Unit;
    travel:Travel|null;
}

export class EventiComponent extends React.Component<IEventiProps>{
    _isMounted = false;
    state:{
        events:Event[],
        mounted:boolean,
        dropdownLabel:string,
        filterSelected:string,
        filteredEvents:Event[],
   }
    
    constructor(props:IEventiProps){
        super(props);
        this.state={
            events:[],
            mounted:false,
            dropdownLabel:"Seleziona tipo evento da visualizzare",
            filterSelected:"all",
            filteredEvents:[]
        };

    }

    getEvents(){
        ApiService.getEvents(this.props.unit.id,(response:AxiosResponse)=>{
            if(response.data==='notfound'){
                    this.setState({events:[],mounted:false});
            }else{
                if(response.data.length!=0){
                    let events:Event[]=response.data;
                    let eventi:Event[]=[];
                    events.filter(event=>{
                        if(this.props.travel!=null){
                           if(event.timestamp>=this.props.travel.start && event.timestamp<=this.props.travel.end)
                                eventi.push(event);
                        }
                    });
                    this.setState({events:eventi, mounted:true,filteredEvents:eventi});
                }else{
                        this.setState({events:[], mounted:true});
                }
            }    
        });
    }

 
    componentDidUpdate(prevProps:IEventiProps) {
        if (this.props.unit !== prevProps.unit || this.props.travel!==prevProps.travel) {
            this.getEvents();
        }
        
     }
     componentDidMount(){
        this._isMounted = true;
        this.getEvents();
    }

    componentWillUnmount(){
        this._isMounted=false;
    }
    private handleSelect=(eventKey:any,event:Object)=>{
        if(eventKey==="all"){
            this.setState({
                dropdownLabel:"Tutti",
                filteredEvents:this.state.events.concat()
            });
        }else if(eventKey==="important"){
            let filtered: Event[]=[];
            this.state.events.map(event=>{
                if(event.important==1){
                    filtered.push(event);
                }
            });
            this.setState({
                dropdownLabel:"Importanti",
                filteredEvents:filtered
            });

        }
    }
  

    render(){
        if(this.state.mounted){
            // var reversed=this.state.events.concat();
            // reversed=reversed.reverse();
            var i=1;
            // var eventsList=this.state.events.reverse().map((event)=>{
            //     return <EventElement key={i} id={i++} event={event}/>;
            // });
            
            return(
                <div className="overflow: hidden;">
                <div>
                        <Dropdown className="dropdown-eventi-container">
                            <Dropdown.Toggle id="dropdown-tipo-evento" className="dropdown-eventi">
                                {this.state.dropdownLabel}
                            </Dropdown.Toggle>
                                <Dropdown.Menu >
                                <Dropdown.Item key="all" eventKey="all" as="button" onSelect={this.handleSelect}>Tutti</Dropdown.Item>
                                <Dropdown.Item key="important" eventKey="important" as="button" onSelect={this.handleSelect}>Importanti</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                <table className="table table-striped ">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Type</th>
                        <th scope="col">Value</th>
                        <th scope="col">Important</th>
                        <th scope="col">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.filteredEvents.reverse().map((event)=>{
                            return <EventElement key={i} id={i++} event={event}/>;
                        })}
                    </tbody>
                </table>
                </div>
            );

        }else{
            return(<div></div>);
        }
    }

}