import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
 import './App.css';
export default class slidemenu extends Component {

  // state = {
  //           query: this.props.loc,
  //           locatioNnedd:{}
  //       }

   //
   // findPlace=(e)=>{
   //   if(!e || e ===''){
   //          this.setState({query: []});
   //          return;
   //  }
   //      const p = this.state.query.filter(loca => e !== loca.name)
   //      this.setState({locatioNnedd:p})
   // }




  render () {
    return (
      <Menu >
       <h1 className="menu-title">Select one of the list to see it!</h1>
        <ol className="list-menu">
        {this.props.loc.map((res)=>{
          return(
          <li className="list" key={res.id}><a className="link" href="">{res.name}</a></li>
         )
       })}
        </ol>
     </Menu>
    );
  }
}
