import { Unit } from 'src/types/Unit';
import * as React from 'react';
import '../styles/mainpanel.css';
import { RouteProps } from 'react-router';
import { MapTab } from './MapTab';
import { EventiComponent } from './EventiComponent';
import * as ApiService from '../ApiService';
import { AxiosResponse } from 'axios';
import { Travel } from 'src/types/Travel';
import Dropdown from 'react-bootstrap/Dropdown';

interface IMainPanelProps extends RouteProps{
    selected:Unit;
    mounted:boolean;
} 

export class MainPanel extends React.Component<IMainPanelProps>{
    _isMounted = false;
    dropDownDescr="";
    initial:Travel={id:-1, device:0, name: "",isOpen: false,start:new Date(),end:new Date()} as Travel;
    state:{ 
        unit:Unit,
        mounted:boolean,
        travels:Travel[],
        selectedTravel:Travel,
        dropdown:string
    };
    
    constructor(props:IMainPanelProps){
        super(props);
        //valore iniziale per i viaggio selezionato
        
        this.state={
            unit:props.selected,
            mounted:props.mounted,
            travels:[],
            dropdown:"Seleziona viaggio",
            selectedTravel:this.initial
        }


     }

    componentDidUpdate(prevProps:IMainPanelProps) {
        if (this.props.selected !== prevProps.selected) {
            this.getTravels();
        }
     }
     componentDidMount() {
        this._isMounted = true;
        this.getTravels();
     }

    componentWillUnmount() {
            this._isMounted = false;
    }

    private getTravels(){
        ApiService.getTravels(this.props.selected.id,(response:AxiosResponse)=>{
            if(response.data==='notfound'){
                this.setState({unit:this.props.selected,mounted:false,travels:[]});
            }else{
                if(response.data.length!=0){
                    this.setState({unit:this.props.selected,travels:response.data, mounted:true});
                }else{
                    this.setState({unit:this.props.selected,travels:[],selectedTravel:this.initial,dropdown:"Seleziona viaggio", mounted:true});                   
                }
            }    
        });
    }

    //gestisce la selezione sulla combo dei viaggi
    private handleSelect=(eventKey: any, event: Object)=> {
        if(eventKey!="vuoto"){
            let travel:Travel=this.state.travels.find(tr=>tr.id==eventKey) as Travel;
            if(travel!==undefined && this.state.selectedTravel!=null){
                if(this._isMounted && this.state.selectedTravel.id!=travel.id)
                    this.setState({selectedTravel:travel,dropdown:travel.name});
            }
        }
    }
  
    render() {
        var icon='/icon.png';
        this.dropDownDescr="Seleziona viaggio";
        
        let viaggi:JSX.Element[]=[];
            if(this.state.travels.length!=0){
                this.state.travels.map(travel=>{
                   viaggi.push( <Dropdown.Item key={travel.id} eventKey={travel.id} as="button" onSelect={this.handleSelect}>{travel.name}</Dropdown.Item>);
                });
            }else{
                viaggi.push(<Dropdown.Item key={"vuoto"} eventKey={"vuoto"} as="button">Non ci sono viaggi disponibili</Dropdown.Item>);
            }    
            return (
                <div className="mainpanel">
                    <div className="nomeunita">
                        <img src={icon} className="title-icon"/><span className="title">  {this.state.unit.name.toLocaleUpperCase()} </span>
                    </div>
                    <div>
                    <div className="dropdown-container">
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-viaggi" className="dropdown">
                                {this.state.dropdown}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-element">
                                {viaggi}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    </div>
                    <div>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="map-tab" data-toggle="tab" href="#map" role="tab" aria-controls="map" aria-selected="false">Mappa</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="log-tab" data-toggle="tab" href="#log" role="tab" aria-controls="log" aria-selected="false">Log Eventi</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="map" role="tabpanel" aria-labelledby="map-tab"><MapTab travel={this.state.selectedTravel} unit={this.state.unit} /></div>
                            <div className="tab-pane fade" id="log" role="tabpanel" aria-labelledby="log-tab"><EventiComponent travel={this.state.selectedTravel} unit={this.state.unit}/></div>
                        </div>
                    </div>
                </div>
            );
        
      
    }

}