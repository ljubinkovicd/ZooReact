'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
} from 'react-native';

export default class ProjectDetailPage extends Component {

  render() {
    var project = this.props.project;
    var coverImage = this.props.backgroundImageUrl;
    var title = project.title;
    var owner = project.links.owner.display_name;
    var createdAt = project.created_at;
    var updatedAt = project.updated_at;
    var description = project.description;

    if (project.introduction) {
      description += "\n\nIntroduction\n\n" + project.introduction;
    }

    return (
      <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: coverImage }}
        />
        <View style={styles.heading}>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.datesContainer}>
            <Text style={styles.dateTextStyle}>Created: {createdAt.substring(0, 10)} at {createdAt.substring(11, 19)}</Text>
            <Text style={styles.dateTextStyle}>Updated: {updatedAt.substring(0, 10)} at {updatedAt.substring(11, 19)}</Text>
          </View>

          <View style={styles.separator} />
        </View>
        <Text style={styles.description}>Description</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    backgroundColor: '#F8F8F8',
  },
  extraDataContainer: {
    flexDirection: 'row',
  },
  separator: {
    height: 1,
    backgroundColor: '#003366'
  },
  image: {
    width: '95%',
    height: 300,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    color: '#48BBEC'
  },
  title: {
    fontSize: 30,
    paddingVertical: 10,
    color: '#003366',
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565',
    textAlign: 'center',
  },
  datesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dateTextStyle: {
    fontSize: 10,
    color: 'rgba(52, 52, 52, 0.8)',
    textAlign: 'right',
    padding: 2,
  },
});
