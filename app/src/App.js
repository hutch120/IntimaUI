/* eslint */
/* global fetch */

import React, {Component} from 'react'
import List, {ListItem, ListItemText} from 'material-ui/List'
import logo from './logo.svg'
import './App.css'
import _ from 'lodash'

const REACT_VERSION = React.version

// const intimaDataURL = 'https://api.intima.io/data.json'
const intimaDataURL =
  'http://localhost:8080/api/v1/contacts/hutch120@gmail.com/token/7/1'

// https://material-ui-next.com/demos/lists/
function ContactList(props) {
  const contacts = props.contacts
  if (!_.isArray(contacts)) {
    return (
      <ListItem button component="a" href="#simple-list">
        <ListItemText primary="{contacts}" />
      </ListItem>
    )
  }
  const contactItems = contacts.map(contact => (
    <ListItem key={contact.toString()} button component="a" href="#simple-list">
      <ListItemText primary={contact} />
    </ListItem>
  ))
  return <List component="nav">{contactItems}</List>
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {contacts: 'Waiting for contacts from Intima.', count: 0}
  }

  tick() {
    var self = this
    fetch(intimaDataURL)
      .then(function(response) {
        self.setState(prevState => ({
          count: prevState.count + 1
        }))

        return response.json() // converts response to json
      })
      .then(function(json) {
        if (_.has(json, 'data') && _.get(json, 'success', false)) {
          self.setState(prevState => ({
            contacts: json.data
          }))
        } else {
          console.log('Invalid contacts.', json)
        }
      })
      .catch(function(ex) {
        console.log('parsing failed', ex, 'url', intimaDataURL)
      })
  }

  componentDidMount() {
    this.tick()
    this.interval = setInterval(() => this.tick(), 5000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Intima UI</h1>
          <h1 className="App-title-h4">Making online better for you.</h1>
          <div>React version: {REACT_VERSION}</div>
        </header>
        <p>
          <b>The data below is being polled from Intima every 5 seconds</b>
        </p>
        <p>URL {intimaDataURL}</p>
        <ContactList contacts={this.state.contacts} />

        <p>Request count: {this.state.count}</p>
      </div>
    )
  }
}

export default App
