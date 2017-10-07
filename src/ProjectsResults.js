'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import ProjectDetailPage from './ProjectDetailPage';

const BASE_URL = 'https://panoptes.zooniverse.org/api';

class ListItem extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      image: '',
    };
  }

  _onTap = () => {
    this.props.onRowTap(this.props.index, this.state.image);
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
      .then(json =>
        this._handleResponse(json)
      )
      .catch(error =>
        this.setState({
          isLoading: false,
          message: 'Something bad happened' + error
        }));
  }

  _handleResponse = (response) => {
    this.setState({ isLoading: false, message: '' });
      console.log('Project background image found: ' + response.media[0].src);

      this.setState({image: response.media[0].src})
  }

  componentDidMount() {
    this._sendRequest(BASE_URL + this.props.project.links.background.href);
  }

  render() {
    const project = this.props.project;
    const projectImgUrl = this.state.image;
    const title = project.title;
    const description = project.description;

    return (
      <TouchableHighlight
        onPress={this._onTap}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: projectImgUrl != '' ? projectImgUrl : '/Users/ljubinkovicd/Desktop/MojeAplikacije/ReactNativeRepos/ZooReact/Resources/img1.jpg' }} />
            <View style={styles.textContainer}>
              <Text style={styles.price}>{title}</Text>
              <Text style={styles.title} numberOfLines={1}>{description}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    )
  }
}

export default class ProjectsResults extends Component {

  _keyExtractor = (item, index) => index;

  _renderProject = ({item, index}) => (
    <ListItem
      project={item}
      index={index}
      onRowTap={this._onRowTap}
    />
  );

    _onRowTap = (index, image) => {
      console.log("Pressed row: " + index);
      this.props.navigator.push({
        title: "Project",
        component: ProjectDetailPage,
        passProps: {project: this.props.projects[index], backgroundImageUrl: image != '' ? image : '/Users/ljubinkovicd/Desktop/MojeAplikacije/ReactNativeRepos/ZooReact/Resources/img1.jpg'}
      });
    }

    /*
      data provides the data to display
      keyExtractor provides a unique key that React uses for efficient list item management
      renderItem specifies how the UI is rendered for each row
    */
    render() {
      return (
        <FlatList
          data={this.props.projects}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderProject}
        />
      )
    }
}

const styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd',
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC',
  },
  title: {
    fontSize: 20,
    color: '#656565',
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
  },
});
