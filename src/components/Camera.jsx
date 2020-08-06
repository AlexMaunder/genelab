import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'
import Webcam from "react-webcam";


class QRCamera extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
      legacyMode: "active",
    }

    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data){
    this.setState({
      result: data,
    })
  }
  handleError(err){
    console.error(err)
  }
  render(){
    const previewStyle = {
      height: 240,
      width: 320,
    }

    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };

    const WebcamCapture = () => {
      const webcamRef = React.useRef(null);

      const capture = React.useCallback(
        () => {
          const imageSrc = webcamRef.current.getScreenshot();
        },
        [webcamRef]
      );
    }

    return(
      <div>
        <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          />
        <p>{this.state.result}</p>

        <Webcam
          audio={false}
          height={720}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
        />
      </div>
    )
  }
}

export default QRCamera;
