import React, {useState, Component}  from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import _ from "lodash";
import { render } from '@testing-library/react';
import { config } from '../Constants' // get prod/dev urls
let FRONT_END_URL = config.url.FRONT_END_URL;
let BACK_END_URL = config.url.API_URL;

class AddStrain extends Component{

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      mating_type: '',
      morphology: '',
      gm:'',
      is_child:'',
      acid_tolerance:'',
      ferment_rate:'',
      traits:'',
      image:'',
      errors: '',
      isChange: false,
      SERVER_URL: BACK_END_URL
     };
     this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    this.setState({
      email: this.props.user.email,
    })
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault()
    const {name, mating_type, morphology, gm, is_child, acid_tolerance, ferment_rate, traits, image} = this.state
    let user = {
      name: name,
      mating_type: mating_type,
      morphology: morphology,
      gm: gm,
      is_child: is_child,
      acid_tolerance: acid_tolerance,
      ferment_rate: ferment_rate,
      traits: traits,
      image: image
    }
    axios.patch(`${BACK_END_URL}/strains/new/${this.props.user.id}.json`, user, {withCredentials: true})
    .then(response => {
      console.log(response)
      this.setState ({
        isChange: true
      })
      // update user details
      this.props.handleUserEdit(response.data);
      this.props.handleLogin(response.data)
    })

    .catch(error => console.log('api errors:', error))
  };

  redirect = () => {
    this.props.history.push('/')
  }

  handleErrors = () => {
    return (
      <div>
        <ul>{this.state.errors.map((error) => {
          return <li key={error}>{error}</li>
        })}
        </ul>
      </div>
    )
  }

  render(){

    return(
      this.props.isLoggedIn ?
      <div className='row justify-content-md-center'>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className = "center">Add a new Strain</h2>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label for="strainname">Strain Name</label>
                    <input
                      className="form-control"
                      name="name"
                      type="strainname"
                      id="strainname"
                      placeholder="S. Cerevisiae"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label for="mating_type">Mating Type</label>
                    <input
                      className="form-control"
                      type="mating_type"
                      name="mating_type"
                      id="mating_type"
                      placeholder="alpha"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label for="morphology">Morphology</label>
                    <input
                      className="form-control"
                      type="morphology"
                      name="morphology"
                      id="morphology"
                      placeholder="rod shaped"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label for="gm">Genetically Modified?</label>
                    <input
                      className="form-control"
                      type="checkbox"
                      name="gm"
                      id="gm"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label for="is_child">Child Strain?</label>
                    <input
                      className="form-control"
                      type="checkbox"
                      name="is_child"
                      id="is_child"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label for="acid_tolerance">Acid Tolerance</label>
                    <input
                      className="form-control"
                      type="acid_tolerance"
                      name="acid_tolerance"
                      id="acid_tolerance"
                      placeholder="4.0"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label for="ferment_rate">Fermentation Rate (hours)</label>
                    <input
                      className="form-control"
                      type="ferment_rate"
                      name="ferment_rate"
                      id="ferment_rate"
                      placeholder="0.2"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label for="traits">Unique Strain Traits</label>
                    <input
                      className="form-control"
                      type="traits"
                      name="traits"
                      id="traits"
                      placeholder="cellulolytic, high acid tolerance"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label for="image">Add an Image</label>
                    <input
                      className="form-control"
                      type="text"
                      name="image"
                      id="image"
                      placeholder="http://fillmurray.com/400/400"
                      onChange={this.handleChange}
                    />
                  </div>
                  <button type="submit" id="submit-btn" className="btn btn-primary">Create</button>
                </form>
                <div>
                  {this.state.errors ? this.handleErrors() : null}
                </div>
              </div>
            </div>
        </div>
      </div>
      :
      < Redirect to='/' />
    )
  }

}


export default AddStrain;
