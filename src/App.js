import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import List from "./Components/List";

class App extends Component {

  // constructor(props) {
  //   super(props);
  //   this.buttonClick = this.buttonClick.bind(this);
  // }
  
  state = {
    monuments: [], // unchanging --> reference point
    query: "",
    markers: [],
    map: null,
    infoBox: null,
    searchedMonuments: []
  };

  //map render resource: Yahya Elharony
    renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCor72WIMibacszLKpzCAjaFnB1I-yTeO0&callback=initMap")
    window.initMap = this.initMap
  }

  componentDidMount = () => {
    axios.get("https://api.myjson.com/bins/tkfjy").then(res =>
      this.setState(
        {
          monuments: res.data,
          searchedMonuments: res.data // array
        },
        () => {
          this.renderMap();
        }
      )
    );
  };

    initMap = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      scrollwhell: true,
      center: { lat: 38.9072, lng: -77.0369 },
      mapTypeControl: false
    });

    const infoBox = new window.google.maps.InfoWindow({});

    this.setState({map, infoBox});

    const { monuments } = this.state;

    const markers = monuments.map(monument => {
      const marker = new window.google.maps.Marker({
        position: {
          lat: monument.location.lat,
          lng: monument.location.lng
        },
        map: map,
        title: monument.title,
        animation: window.google.maps.Animation.DROP,
        key: monument.key
      });
      monument.marker = marker;

      const content = `${monument.title}` + " <br/>" + `${monument.address}` + "<br/>" + `<a href="${monument.url}"> Click here more information from Wiki!</a>`;

      marker.addListener("click", () => {
        infoBox.open(map, marker);
        infoBox.setContent(content);
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE); //have to click to close - fix
        }
      })
      infoBox.addListener('closeclick', () => {
        marker.setAnimation(null);
      }); 
      
      
      return monument;
    });
    this.setState({ markers });
  };

filterMonuments = (query) => {
  const searchedMonuments = this.state.monuments.filter(monument => {
    const queryMatch = monument.title.toLowerCase().includes(query.toLowerCase());
    if (queryMatch) {
      monument.marker.setVisible(true);
    } else {
      monument.marker.setVisible(false);
    }
    return queryMatch;
  })
  this.setState({ searchedMonuments });
  this.setState({query});
  console.log (query)
}

buttonClick = () => {
  console.log('button clicked');
}

render() {
  return (
    <div className="App">
      <h1>Monuments in DC (Neighborhood Map P7)</h1>
    <div id="map" />

    <div id="sidebar">
      <input className="input" placeholder="Filter Monuments" value={this.state.query} onChange={(e) => {this.filterMonuments(e.target.value)}}/>
      <List monuments={this.state.monuments} searchedMonuments={this.state.searchedMonuments} buttonClick={this.buttonClick} />
      </div>
    </div>
    );
  }
}

function loadScript (url){
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  script.onerror = function() {
    document.write("Google Maps can't be loaded");
  };
  index.parentNode.insertBefore(script, index);
};

export default App;
