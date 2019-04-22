import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';

const particleOptions = {
  "particles": {
    "number": {
      "value": 200,
      "density": {
        "enable": true,
        "value_area": 800,
      }
    },
    "size": {
      "value": 5,
      "random": true,
      "anim": {
        "speed": 4,
        "size_min": 0.3
      }
    },
    "line_linked": {
      "enable": false
    },
    "move": {
      "random": true,
      "speed": 1,
      "direction": "top",
      "out_mode": "out"
    },
    "interactivity": {
      "events": {
        "onhover": {
            "enable": false,
            "mode": "bubble"
        },
        "onclick": {
            "enable": false,
            "mode": "repulse"
        }
      },
      "modes": {
        "bubble": {
          "distance": 150,
          "duration": 2,
          "size": 1,
          "opacity": 0
        },
        "repulse": {
          "distance": 400,
          "duration": 4
        }
      }
    }
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles
          className='particles' 
          params={particleOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/*
        <ImageRecognition />
        */}        
      </div>
    );
  }
}

export default App;
