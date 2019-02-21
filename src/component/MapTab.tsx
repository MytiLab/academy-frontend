import * as React from 'react';
import {MapComponent} from './MapComponent';
import{MyPosition} from 'src/types/Position';
import { Unit } from 'src/types/Unit';
import * as ApiService from '../ApiService';
import { AxiosResponse } from 'axios';
import { Travel } from 'src/types/Travel';


interface IMapsProps{
    unit:Unit;
    travel:Travel|null;
}

export class MapTab extends React.Component<IMapsProps>{
    _isMounted=false;
    state:{
        positions:MyPosition[],
        mounted:boolean
    }
    
    constructor(props:IMapsProps){
        super(props);
        this.state={
            positions:[],
            mounted:false
        };        
    }




    componentDidUpdate(prevProps:IMapsProps){

        if (this.props.unit !== prevProps.unit || this.props.travel!== prevProps.travel) {
            if(this._isMounted)
                this.getPositions();
        }
        
    }

    private getPositions(){
       ApiService.getPositions(this.props.unit.id,(response:AxiosResponse)=>{
        if(response.data==='notfound'){
                this.setState({lista:[],mounted:false});
        }else{  
           if(response.data.length!=0){
            let positions:MyPosition[]=response.data;
            let filteredPositions:MyPosition[]=[];
            positions.forEach(pos=>{
                if(this.props.travel!=null){
                 if(pos.timestamp>=this.props.travel.start && pos.timestamp<=this.props.travel.end)
                    filteredPositions.push(pos);
                }
            });
                this.setState({positions:filteredPositions,mounted:true});
            
           }else{
                this.setState({positions:[],mounted:false});    
           }
        }
        });
    }

    componentDidMount(){
        this._isMounted=true;
        // this.getPositions();
    }
    componentWillUnmount(){
        this._isMounted=false;
    }
   
    render(){
        return(
            <MapComponent positions={this.state.positions} mounted={this.state.mounted}></MapComponent>
        );
        

    }
}