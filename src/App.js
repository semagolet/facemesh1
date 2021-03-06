
import React, {useRef} from 'react'
//import logo from './logo.svg';

import './App.css';

import * as tf from "@tensorflow/tfjs"
import * as facemesh from "@tensorflow-models/facemesh"
import Webcam from "react-webcam"

function App() {
 
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

// load facemesh
  const runFacemesh = async () =>{
    const net = await facemesh.load({
      inputResolution:{width:640, height:480}, scale:0.8
    })
  }
 // detect fucn

 

  return (
    <div className="App">
      <header className="App*header">
      <Webcam ref ={webcamRef} style ={
        {
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left:0,
          right:0,
          textAlign:"center",
          zIndex:9,
          width:640,
          height:480

        }
      } />

      <canvas ref= {canvasRef}
      style={
        {
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left:0,
          right:0,
          textAlign:"center",
          zIndex:9,
          width:640,
          height:480
        }
      } /> 
      </header>
    </div>
  );
}

export default App;
