
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
    });
    setInterval(() =>
    {
      detect(net) 
    },100
    
    
    )
  };
 // detect fucn

 const detect = async (net) => {
   if(typeof webcamRef.current !== "undefined" && 
      webcamRef.current !== null && 
      webcamRef.current.video.readyState===4
    ) {

      // get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // video boyutu

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
// Make Detections
      // OLD MODEL
      //       const face = await net.estimateFaces(video);
      // NEW MODEL
      const face = await net.estimateFaces({input:video});
      console.log(face);

      // Get canvas context
      const ctx = canvasRef.current.getContext("2d");
      requestAnimationFrame(()=>{drawMesh(face, ctx)});
      

   }
 };
 runFacemesh();


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
