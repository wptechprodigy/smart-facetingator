import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ImageRecognition from './components/ImageRecognition/ImageRecognition';
import './App.css';

const app = new Clarifai.App({
 apiKey: 'c8c806486bb04442a67f3c86468438d0',
});

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
  constructor() {
    super();
    // Define states
    this.state = {
      input: '',
      imageUrl: '',
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models
      .initModel({
        id: Clarifai.FACE_DETECT_MODEL, 
        version: "aa7f35c01e0642fda5cf400f543e7c40",
      })
      .then(faceDetectModel => {
        return faceDetectModel.predict(this.state.input);
      })
      .then(response => {
        let regions = response.outputs[0].data.regions[0].region_info.bounding_box
      })
  }

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
        <ImageLinkForm 
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <ImageRecognition 
          imageUrl={this.state.imageUrl}
        />
      </div>
    );
  }
}

export default App;
