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
    const p = this.state.myMarker
        p.map((ress)=>{
return(
      fetch('https://api.foursquare.com/v2/venues/'+ress.id+"?&client_secret=PGG53ZQZSKZCSGQ1WCJLN0P4HTYWDCMMK2ZVT5TJTDPELK2I&client_id=BHGL1GBNXCOS2EBREZZMZM2N1TEQI2MOYRQZDCMZ5UU4RZFP&v=20180629")

      .then(res => res.json())
      .then((result) => {
        ress.name =result.response.venue.name
        ress.contact = result.response.venue.contact.formattedPhone

       })
     )
    })
    this.setState({place:p})
  }


    onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });


     onMapClicked = (props) => {
   if (this.state.showingInfoWindow) {
     this.setState({
       showingInfoWindow: false,
       activeMarker: null
     })
   }
 };
  render() {
  console.log(this.state.activeMarker);
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
        {this.state.place.map((res)=>{
          return(
        <Marker key={res.id} title={res.name} position={{lat:res.lat ,lng:res.lng}} onClick={this.onMarkerClick} cont={res.contact}/>
         )
       })}

       <InfoWindow
           marker={this.state.activeMarker}
           visible={this.state.showingInfoWindow}>
             <div>
               <h1>{this.state.selectedPlace.name}</h1>
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
