import React, {Component}  from 'react';
import axios from 'axios'
import Cookies from 'js-cookie';
import {Redirect, withRouter } from 'react-router-dom';
import { config } from '../Constants' // get prod/dev urls
let FRONT_END_URL = config.url.FRONT_END_URL;
let BACK_END_URL = config.url.API_URL;


class Signin extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: ''
     };
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };

  handleSubmit = (event) => {
      event.preventDefault()
      const {email, password} = this.state

      let user = {
        email: email,
        password: password
      }

      axios.post(BACK_END_URL+'/login', {user}, {withCredentials: true})
        .then(response => {
          if (response.data.logged_in) {
            this.props.handleLogin(response.data);
            this.props.history.push("/") //doing redirect here.
            // set the cookie if login is true
            Cookies.set("user", "loginTrue", { expires: 1 });
            this.props.readCookie();
          } else {
            this.setState({
              errors: response.data.errors
            })
          }
        })
        .catch(error => console.log('api errors:', error))
    };


    handleErrors = () => {
        return (
          <div>
            <ul>
            {this.state.errors.map(error => {
            return <li key={error}>{error}</li>
              })}
            </ul>
          </div>
        )
      }

    render(){
      const {email, password} = this.state

        return(
            <div className='row justify-content-md-center'>
                <div className="col-md-6">
                    <div className="card bg-dark text-white">
                        <div className="card-body">
                            <h2 className = "center">Sign In</h2>
                              <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                      className="form-control"
                                      name="email"
                                      type="email"
                                      id="email"
                                      placeholder="Email"
                                      value={this.state.email}
                                      onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label >Password</label>
                                    <input
                                      className="form-control"
                                      name="password"
                                      type="password"
                                      id="password"
                                      placeholder="Password"
                                      value={this.state.password}
                                      onChange={this.handleChange}
                                    />
                                </div>
                                <button type="submit" id="submit-btn" className="btn btn-primary">Sign In</button>
                              </form>
                              <div>
                                {this.state.errors ? this.handleErrors() : null}
                              </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Signin);
