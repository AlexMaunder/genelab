import React, {useState, Component}  from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import _ from "lodash";
import { Card, CardColumns } from 'react-bootstrap';
import { render } from '@testing-library/react';
import { config } from '../Constants' // get prod/dev urls
let FRONT_END_URL = config.url.FRONT_END_URL;
let BACK_END_URL = config.url.API_URL;

class MyStrains extends Component{

  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      strains: this.props.strains,
      user_strains: [],
    }
  }

  componentDidMount() {
    if (!this.props.loggedInStatus) {
      this.props.history.push('/sign-in')
    } else {
      this.setState({user_id: this.props.user.id})
      let user_strains = []
      user_strains.push(_.filter(this.props.strains, {user_id: this.props.user.id}))
      this.setState({user_strains: user_strains[0]})
    }
  }

  showProducts(strainsArray) {
      if(strainsArray) {
          return(
              strainsArray.map((strain) => {
                // render strain card
                return(
                  <div key={strain.id} className='col-3 item'>
                    <Card className="p-3">
                      <Card.Img variant="top" className='img-thumbnail img-fluid' src={strain.image} alt={strain.name}/>
                    </Card>
                      <h3 key={strain.id} >{strain.name} ...</h3>
                      <p>{strain.traits}...</p>
                      <p>Created: {Math.floor(Math.abs(new Date() - new Date(strain.created_at))/1000/60/60/24)} days ago</p>
                      {this.props.isLoggedIn ?
                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => {this.handleClick(strain.id)}}>Edit Strain</button> : ''
                      }
                  </div>
                  )
              })
          )
      } else{
          return (<h2>Add a Strain</h2>);
      }
  }


  render() {
    return(
      <div className="myStrains">
        {this.props.loggedInStatus ? (
          <div className="addStrains">
            <h1>My Strains</h1>
            <div className="row">
              {this.showProducts(this.state.strains)}
            </div>
            <Link to="/add-strain" className="btn btn-success btn-lg">+ Add Strain</Link>

          </div>
          ) : (
            <h1>Please Sign in to see your strains</h1>
        )}
      </div>
    )
  }
}


export default MyStrains;
