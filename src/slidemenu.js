import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
 import './App.css';
 import escapeRegExp from 'escape-string-regexp'
export default class slidemenu extends Component {

        state ={
            query:''
        }

 findloc= (query)=>{
   this.setState({query: query.trim()})

 }
  render () {
        let location

        if(this.state.query){
        const match = new RegExp(escapeRegExp(this.state.query) , 'i')
        location =  this.props.loc.filter((cont)=> match.test(cont.name) )
        }else{
        location =  this.props.loc;
        }

   console.log(this.state.query);
    return (
      <Menu >
          <input
          aria-required="true"
          className="Search-bar"
          type="text"
          value={this.state.query}
          onChange={(e)=>this.findloc(e.target.value)}
          placeholder="Search about place"/>
        <ol className="list-menu">


        {location.map((res)=>{
          return(
         <button key={res.id} onClick={()=>this.props.onMarkerClick(res ,res.name)}    className="list">{res.name}</button>
         )
       })}
        </ol>
     </Menu>
    );
  }
}
