import React, { Component } from 'react';
import './App.css';

import Slidemenu from './slidemenu'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class App extends Component {
  state={
    myMarker:[
      {
      id : "4bb324ee42959c74f790212c",
      name:' ',
      contact:'',
      position:{ lat: 24.692822, lng: 46.695275}
     },
     {
      id : "4bb7ae81cf2fc9b6e99e9e02",
       name:'',
       contact:'',
       position:{ lat: 24.688967, lng: 46.703240}

      },
      {
        id : "4db599fc81543d71da5b8e83",
        name:'',
        contact:'',
        position:{  lat: 24.697504,lng: 46.683967}


       },
      {
        id : "4bb3aa0c14cfd13a455f16ab",
        name:'',
        contact:'',
        position:{   lat: 24.707841,lng: 46.675313}

        },
        {
        id : "4bb60acd46d4a5932198c5c0",
        name:'',
        contact:'',
        position:{lat: 24.692855,lng: 46.669626}

         }
      ],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},

  }
//fetch the foursquare API to bring data
  componentDidMount() {
    const temp = this.state.myMarker
        temp.map((ress)=>{
return(
      fetch('https://api.foursquare.com/v2/venues/'+ress.id+"?&client_secret=N2KRN3O5KSZYGNYCQOVPYLL5OCYIBOARJEEI21DA242S4BDD&client_id=OTTPGOIVHLELWJ5IKGI2M0I2THW3ABXFP3RN24E2J30A5KGN&v=20180629")
      .then(res => res.json())
      .then((result) => {
        if(result && result.response){
        ress.name =result.response.venue.name
        ress.contact = result.response.venue.contact.formattedPhone
      }}).catch(re=>{
        console.log("There are error in lodeing data please try agane");
      })
     )
    })
       this.setState({myMarker:temp})
  }

  //when marker clicked this open InfoWindow
  onMarkerClick = (location) =>{
    console.log(location);
  this.setState({
    position: {lat:location.position.lat , lng:location.position.lng },
    showingInfoWindow: true,
    name: location.name,
    contact: location.contact
  });
}

//clic anywhere in map to close InfoWindow
     onMapClicked = (props) => {
   if (this.state.showingInfoWindow) {
     this.setState({
       showingInfoWindow: false,
       activeMarker: null
     })
   }
 };



  render() {
    return (
        <div className="App">
        <Map google={this.props.google}
        className={'map'}
           onClick={this.onMapClicked}
        initialCenter={{
          lat:24.696765,
          lng: 46.683499
        }}
        zoom={15} >
        {this.state.myMarker.map((res)=>{

          return(
        <Marker key={res.id} name={res.name} position={res.position} onClick={this.onMarkerClick} contact={res.contact}/>
         )
       })}

       <InfoWindow
               position={this.state.position}
               visible={this.state.showingInfoWindow}>
                  <div>
               <h3 className={"heading"} >Name: {this.state.name}</h3>
               <h3 className={"heading"}>contact Number: {this.state.contact}</h3>
               </div>
             </InfoWindow>

        </Map>
        <Slidemenu onMarkerClick={this.onMarkerClick} loc={this.state.myMarker}/>
        </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: ('AIzaSyCS7x4GKH0ecNQKouvoF0kBkF11cmWMez8')
})(App)
