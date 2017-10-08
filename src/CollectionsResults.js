'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Slider,
  FastImage,
} from 'react-native';

export default class CollectionsResults extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      message: '',
    };
  }

  render() {
    return (
      <Text style={{marginTop: 150}}>Some text</Text>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  },
  });
