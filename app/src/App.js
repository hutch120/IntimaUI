/* eslint */
/* global fetch */

import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import _ from 'lodash'

const intimaDataURL = 'http://localhost:8080/data.json'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { data: 'Waiting for data from Intima.', count: 0 }
  }

  tick () {
    var self = this
    fetch(intimaDataURL)
      .then(function (response) {
        self.setState(prevState => ({
          count: prevState.count + 1
        }))

        return response.json() // converts response to json
      }).then(function (json) {
        if (_.has(json, 'data')) {
          self.setState(prevState => ({
            data: json.data
          }))
        } else {
          console.log('Invalid data.', json)
        }
      }).catch(function (ex) {
        console.log('parsing failed', ex, 'url', intimaDataURL)
      })
  }

  componentDidMount () {
    this.tick()
    this.interval = setInterval(() => this.tick(), 5000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to Intima UI</h1>
          <h1 className='App-title-h4'>Making online better for you.</h1>
        </header>
        <p><b>The data below is being polled from Intima every 5 seconds</b></p>
        <p>URL {intimaDataURL}</p>
        <p>{this.state.data}</p>
        <p>Request count: {this.state.count}</p>
      </div>
    )
  }
}

export default App
