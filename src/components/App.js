import React, { Component } from 'react';

import NavBar from './NavBar';
import Home from './Home';
import Signup from './Signup';
import Signin from './Signin';
import _ from 'lodash';


import './App.css';

import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import axios from 'axios';
import Cookies from 'js-cookie';

import { config } from '../Constants' // get prod/dev urls
let FRONT_END_URL = config.url.FRONT_END_URL;
let BACK_END_URL = config.url.API_URL;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PRODUCT_URL: `${BACK_END_URL}/products`,
      USER_URL: `${BACK_END_URL}/users`,
      isLoggedIn: false,
      setAuth: false,
      user: {},
      users: [],
      products: [],
     };

    this.fetchUsers = this.fetchUsers.bind(this);
    this.readCookie = this.readCookie.bind(this);
    this.fetchUsers();
    this.readCookie();
  }

  viewProduct(product_id) {
    this.setState({ productSelect: product_id })
  }

  fetchProducts() {
    axios.get(this.state.PRODUCT_URL)
      .then(response => {
        if (response.data) {
          this.setState({ products: response.data });

        } else {
          this.setState({
            errors: response.data.errors
          })
        }
      })
  }

  fetchUsers() {
    axios.get(this.state.USER_URL)
      .then(response => {
        if (response.data) {
          this.setState({ users: response.data.users });
        } else {
          this.setState({
            errors: response.data.errors
          })
        }
      })
  }

  componentDidMount() {
    this.loginStatus()
    this.readCookie()
  }

  loginStatus = () => {
    axios.get(`${BACK_END_URL}/logged_in`,
   {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response)
        this.readCookie()
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user //BUG doesnt set right?
    })
  }

  handleLogout = () => {
    axios.delete(`${BACK_END_URL}/logout`).then(
    this.setState({
      isLoggedIn: false,
      setAuth: false,
      user: {}
    }),
    Cookies.remove("user")
  )}

  handleUserEdit = (user) => {
    this.setState({
      user: user
    })
  }

  readCookie = () => {
    const user = Cookies.get("user");
    if(user){
      this.setState({
        setAuth: true
      })
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <NavBar handleLogout={this.handleLogout} userID={this.state.user} loggedInStatus={this.state.isLoggedIn}/>
          <div className='content'>
            <div className='body'>
                <Switch>z
                  <Route exact path='/sign-up' render={props => (
                    <Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>)}
                  />
                  <Route exact path='/sign-in' render={props => (
                    <Signin handleLogin={this.handleLogin} readCookie={this.readCookie} loggedInStatus={this.state.isLoggedIn}/>)}
                  />
                  <Route exact path='/' render={props => (
                    <Home handleLogout={this.handleLogout} {...this.state} loggedInStatus={this.state.isLoggedIn} />)}
                  />
              </Switch>
            </div>
          </div>
          {/* <Footer/> */}
        </Router>
      </div>
    );
  }
}

export default App;
