import React, { Component } from 'react';
import './App.css';
import Slidemenu from './slidemenu'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';



class App extends Component {
  state={
    myMarker:[
      {
      id : "4bb324ee42959c74f790212c",
      name:' Assaraya Turkish Restaurant',
      contact:'044994',
       lat: 24.692822,
       lng: 46.695275
     },
     {
      id : "4bb7ae81cf2fc9b6e99e9e02",
       name:'king fahad medical city',
       contact:'949494',
        lat: 24.688967,
        lng: 46.703240
      },
      {
      id : "4db599fc81543d71da5b8e83",
        name:'Centria Mall',
        contact:'04949494',
         lat: 24.697504,
         lng: 46.683967

       },
      {
      id : "4bb3aa0c14cfd13a455f16ab",
         name:'Fairouz Garden Restaurant',
         contact:'9499494',
          lat: 24.707841,
          lng: 46.675313
        },
        {
        id : "4bb60acd46d4a5932198c5c0",
          name:'Panorama Mall',
          contact:'9494833',
           lat: 24.692855,
           lng: 46.669626
         }
      ],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
       place:[]
  }

  componentDidMount() {
    const temp = this.state.myMarker
        temp.map((ress)=>{
return(
      fetch('https://api.foursquare.com/v2/venues/'+ress.id+"?&client_secret=SPWJKXYP5XDFFSSBCTZ3F0NQQZXMAZB1L0MRXNWAN3WODKR0&client_id=3BJNU223FDTYXD4W4HZBWCDXHEIL3LXIYOD3U230BZQEHBDS&v=20180629")
      .then(res => res.json())
      .then((result) => {
        ress.name =result.response.venue.name
        ress.contact = result.response.venue.contact.formattedPhone

       })

     )

    })
       this.setState({myMarker:temp})


  }


  onMarkerClick = (location) =>{
    console.log(location);
  this.setState({
    position: {lat:location.position.lat, lng:location.position.lng },
    showingInfoWindow: true,
    name: location.title,
    contact: location.cont
  });
}


     onMapClicked = (props) => {
   if (this.state.showingInfoWindow) {
     this.setState({
       showingInfoWindow: false,
       activeMarker: null
     })
   }
 };
  render() {
  console.log(this.state.myMarker);
console.log(this.state.selectedPlace);
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
        <Marker key={res.id} title={res.name} position={{lat:res.lat ,lng:res.lng}} onClick={this.onMarkerClick} cont={res.contact}/>
         )
       })}

       <InfoWindow
               position={this.state.position}
               visible={this.state.showingInfoWindow}>
                  <div>
               <h7>Name: {this.state.name}</h7>
               <h7>Name: {this.state.contact}</h7>
               </div>
             </InfoWindow>

        </Map>
        <Slidemenu loc ={this.state.myMarker}/>
        </div>
    );
  }







}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCS7x4GKH0ecNQKouvoF0kBkF11cmWMez8')
})(App)
