import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';
import { config } from '../Constants' // get prod/dev urls
import { Redirect } from 'react-router-dom'

let FRONT_END_URL = config.url.FRONT_END_URL;
let BACK_END_URL = config.url.API_URL;


class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
     };
  }

  render(){
  return(
          <div>
              <h1>GeneLab Home</h1>
              <h5>Phylogeny Visualiser</h5>
              <p>GeneLab is the quintessential repository for all Genetic Lab strains. Finally, there is a nice way to track strain information, phylogeny and lab data!
              {this.props.loggedInStatus ? '' : (<span> Create an account and organise your lab strains today!</span>)}</p>
              <img src="https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/images/sn-treeoflife.jpg?itok=AXS5irW-" alt="phylogenetic map" width="500"/>
          </div>
      )
  }
}

export default Home;
