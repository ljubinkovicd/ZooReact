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

const PROJECTS_URL = 'https://panoptes.zooniverse.org/api/projects';

function urlRequestQuery(page = 1, pageSize = 20, sort = "id") {

  const data = {
    page: page,
    page_size: pageSize,
    sort: sort,
  };

  const queryString = Object.keys(data)
    .map(key => key + "=" + encodeURIComponent(data[key]))
    .join('&');

  return PROJECTS_URL + "?" + queryString;
}

const backgroundImageUri = '/Users/ljubinkovicd/Desktop/MojeAplikacije/ReactNativeRepos/ZooReact/Resources/background.jpg';
const resizeMode = 'cover';

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

  render() {

    return (
      <View style={styles.container}>

        <View style={styles.backgroundImageContainer}>
          <Image style={styles.backgroundImage} source={{ uri: backgroundImageUri }}/>
        </View>

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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
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
});
