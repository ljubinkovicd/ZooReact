'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  Text,
  TouchableHighlight,
  View,
  NavigatorIOS,
  Image
} from 'react-native';

import ProjectsResults from './ProjectsResults';
import TestMasonry from './TestMasonry';

import apiClient from 'panoptes-client/lib/api-client';
import auth from 'panoptes-client/lib/auth';
import oauth from 'panoptes-client/lib/oauth';
import talkClient from 'panoptes-client/lib/talk-client';

const PROJECTS_URL = 'https://panoptes-staging.zooniverse.org/api/projects?';

function urlRequestQuery(page = 1, pageSize = 20, sort = "id") {

  const data = {
    page: page,
    page_size: pageSize,
    sort: sort,
  };

  const queryString = Object.keys(data)
    .map(key => key + "=" + encodeURIComponent(data[key]))
    .join('&');

  return PROJECTS_URL + queryString;
}

const backgroundImageUri = '/Users/ljubinkovicd/Desktop/MojeAplikacije/ReactNativeRepos/ZooReact/Resources/background.jpg';
const resizeMode = 'cover';

// App info
const APP_ID = '0c84eef92173bcd042100062c535cf0abf702645338e694d65591e23cb3a79a7';

export default class MainPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      message: '',
    };
  }

  _sendRequest = (request) => {
    console.log(request);
    this.setState({ isLoading: true });

    var myHeaders = new Headers();
    /*
      All requests should set Accept: application/vnd.api+json; version=1.
      You will receive a 404 Not Found without it.
    */
    myHeaders.set("Content-Type", "application/json");
    myHeaders.set("Accept", "application/vnd.api+json; version=1");

    var myInit = {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default'
    };

    fetch(request, myInit)
      .then(response => response.json())
      .then(json => this._handleResponse(json))
      .catch(error =>
        this.setState({
          isLoading: false,
          message: 'Something bad happened' + error
        }));
  }

  _handleResponse = (response) => {
    // console.log(response);
    // console.log(response.projects[0].links.background.href); // PROJECTS_URL + image url
    this.setState({ isLoading: false, message: '' });
    // if (response.application_response_code.substr(0, 1) === '2') { // If the response code starts with 2**
      // console.log('Projects found: ' + response.projects.length);
      this.props.navigator.push({
        title: 'Results',
        component: ProjectsResults,
        passProps: {projects: response.projects}
      });
    // } else {
      // this.setState({ message: 'Something went terribly wrong...'});
    // }
  }

  _onProjectsButtonTapped = () => {
    console.log("Projects tapped");
    const requestQuery = urlRequestQuery(); // Using default parameters here
    this._sendRequest(requestQuery);
  }

  _onSubjectsButtonTapped = () => {
    console.log("Subjects tapped");
    this.props.navigator.push({
      title: 'Masonry',
      component: TestMasonry,
      passProps: {}
    });
  }

  _onUsersButtonTapped = () => {
    console.log("Users tapped");
    this.props.navigator.push({
      title: 'GridLayout',
      component: TestGridLayout,
      passProps: {}
    });
  }

  _onOAuthButtonTapped = () => {
    console.log("OAuth tapped");
    // authentication proces..
    oauth.signIn('https://panoptes.zooniverse.org/oauth/authorize/0c28cf6b9b421262f307f7c6c869a99329d275af60fc402cccd45b28e2a47646')
  }

  render() {

    return (
      <View style={styles.container}>

        <View style={styles.backgroundImageContainer}>
          <Image style={styles.backgroundImage} source={{ uri: backgroundImageUri }}/>
        </View>

        <View style={styles.upperContainer}>
          <TouchableHighlight onPress={this._onProjectsButtonTapped} underlayColor="transparent">
            <View style={styles.prettyButton}>
              <Text style={styles.prettyButtonText}>Projects</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._onSubjectsButtonTapped} underlayColor="transparent">
            <View style={styles.prettyButton}>
              <Text style={styles.prettyButtonText}>Subjects</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._onUsersButtonTapped} underlayColor="transparent">
            <View style={styles.prettyButton}>
              <Text style={styles.prettyButtonText}>Users</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.lowerContainer}>
          <TouchableHighlight onPress={this._onOAuthButtonTapped} underlayColor="transparent">
            <View style={styles.oauthButton}>
              <Text style={styles.oauthButtonText}>OAuth</Text>
            </View>
          </TouchableHighlight>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  backgroundImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: resizeMode,
  },
  upperContainer: {
    flex: 1,
    marginTop: 60,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  lowerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  prettyButton: {
    margin: 10,
    borderRadius: 30,
    backgroundColor: '#003366',
    alignItems: 'center',
    width: 200,
  },
  prettyButtonText: {
    padding: 10,
    color: 'white',
    fontSize: 20,
  },
  oauthButton: {
    borderRadius: 30,
    backgroundColor: '#48BBEC',
    alignItems: 'center',
    width: 150,
  },
  oauthButtonText: {
    padding: 10,
    color: 'white',
    fontSize: 20,
  }
});
