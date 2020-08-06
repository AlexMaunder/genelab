import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'

class QRCamera extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
      legacyMode: true,
    }

    this.handleScan = this.handleScan.bind(this)
    this.handleError = this.handleError.bind(this)
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

    return(
      <div>
        <QrReader
          delay={this.state.delay}
          style={previewStyle}
          legacyMode={this.state.legacyMode}
          onError={this.handleError}
          onScan={this.handleScan}
          />
        <p>{this.state.result}</p>
      </div>
    )
  }
}

export default QRCamera;
