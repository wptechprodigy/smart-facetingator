import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ImageRecognition from './components/ImageRecognition/ImageRecognition';
import './App.css';

// Instatiate Clarifai instance
const app = new Clarifai.App({
 apiKey: 'c8c806486bb04442a67f3c86468438d0',
});

// Background particle options
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
      faceBox: '',
      route: 'signin',
      isSignedIn: false,
    }
  }
  // Calculate face region
  calculateFaceBoxRegion = (data) => {
    const faceRegions = data.outputs[0].data.regions[0].region_info.bounding_box;
    const imageInput = document.getElementById('image-input');
    const width = Number(imageInput.width);
    const height = Number(imageInput.height);
    return {
      leftCol: faceRegions.left_col * width,
      topRow: faceRegions.top_row * height,
      rightCol: width - (faceRegions.right_col * width),
      bottomRow: height - (faceRegions.bottom_row * height),
    }    
  }

  // Display the face region
  displayFaceRegion = faceBox => this.setState({faceBox});

  // Set input to new image url
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  // When the Investigate button is clicked
  onButtonSubmit = () => {
    // Set image url new state
    this.setState({imageUrl: this.state.input})
    // Clarifai api call to predict face
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(response => this.displayFaceRegion(this.calculateFaceBoxRegion(response)))
      .catch(err => console.log(err));
  }

  // When route changes
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({ route: route });
  }

  render() {
   const { isSignedIn, imageUrl, route, faceBox } = this.state;
    return (
      <div className="App">
        <Particles
          className='particles' 
          params={particleOptions}
        />
        <Navigation 
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm 
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <ImageRecognition 
                imageUrl={imageUrl}
                faceBox={faceBox}
              />
            </div>
          : (
            route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} /> 
          )
        }
      </div>
    );
  }
}

export default App;
