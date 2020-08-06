import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { config } from '../Constants' // get prod/dev urls
import { Redirect } from 'react-router-dom'

let FRONT_END_URL = config.url.FRONT_END_URL;
let BACK_END_URL = config.url.API_URL;


class BuyStrain extends Component{

  render(){
    const mystyle = {
      class:"iframe",
      name:"info",
      seamless:"",
      height:"100vh",
      width:"100vw",
      allow: "fullscreen"
    };
  return(
          <div className="container-xl">
            <div className="row">
              <iframe src="https://www.thermofisher.com/search/browse/category/us/en/80801/Primary+Cells" title="buy strains" style={mystyle}></iframe>
            </div>
          </div>
      )
  }
}

export default BuyStrain;
