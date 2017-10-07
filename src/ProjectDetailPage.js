'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';

export default class ProjectDetailPage extends Component {

  render() {
    var project = this.props.project;
    var coverImage = this.props.backgroundImageUrl;
    var title = project.title;
    var owner = project.links.owner.display_name;
    var createdAt = project.created_at;
    var description = project.description;

    if (project.introduction) {
      description += "\n" + project.introduction;
    }

    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: coverImage }}
        />
        <View style={styles.heading}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.separator} />
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 65
  },
  heading: {
    backgroundColor: '#F8F8F8',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  image: {
    width: 400,
    height: 300
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  }
});
