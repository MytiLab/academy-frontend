import * as React from 'react';
import './App.css';
import {StateModel} from './types/StateModel';
import {Menu} from './component/Menu';
import { Unit } from './types/Unit';
import { Route} from 'react-router-dom';
import * as ApiService from './ApiService';
import { MainPanel } from './component/MainPanel';
import { AxiosResponse } from 'axios';

class App extends React.Component {
  state:StateModel={selected:new Unit(), lista:new Array<Unit>(), mounted:false};

  async componentDidMount(){
      await ApiService.getDevices((response:AxiosResponse)=>{ 
        if(response.data==='notfound'){
          this.setState({lista:[],mounted:false});
        }
        else{
          if(response.data.length!=0){

          console.log(response.data);
              this.setState({lista:response.data,mounted:true});
          }else{
            this.setState({lista:[],mounted:true});
          }
        }
      });
  }

  private getUnitById(id:number):Unit{
    let unit:Array<Unit>=this.state.lista.filter((unit) =>unit.id==id);
    if(unit[0]!=undefined){
        return unit[0];
    }else{
      alert("Unit Not Found");
      let u:Unit=new Unit();
      u.id=0;
      u.name="Not Found";
      return u;
    }
  }

  public render() {
    if(this.state.mounted){
      var logo=require('./logo.png');
      return(
       <div className="position:fixed;">
       
          <header className="App-header">
            <img src={logo}/>
          </header>
            <Menu listaUnit={this.state.lista}/>
          
       
           <div>         
            <Route path="/unit/:id/detail" render={({match})=>(
              <MainPanel selected={this.getUnitById(match.params.id)} mounted={this.state.mounted}/>
            )}/>
           </div>
      </div>
      ); 
    }else{
      return(<div></div>);
    }
  }
}

export default App;
