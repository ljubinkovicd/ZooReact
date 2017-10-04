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

const BASE_URL = 'https://panoptes-staging.zooniverse.org/api';

class ListItem extends React.PureComponent {

  _onTap = () => {
    this.props.onRowTap(this.props.index);
  }

  render() {
    const project = this.props.project;
    const title = project.title;
    const description = project.description;
    const projectImgUrl = BASE_URL + project.links.background.href;

    console.log(typeof projectImgUrl);

    return (
      <TouchableHighlight
        onPress={this._onTap}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: '/Users/ljubinkovicd/Desktop/MojeAplikacije/ReactNativeRepos/ZooReact/Resources/testImg.png' }} />
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

    _onRowTap = (index) => {
      console.log("Pressed row: " + index);
      this.props.navigator.push({
        title: "Project",
        component: ProjectDetailPage,
        passProps: {project: this.props.projects[index]}
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
