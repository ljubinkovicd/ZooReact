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
import Masonry from 'react-native-masonry';

const data = [
  {
    data: {
      caption: 'Cute Animals',
      user: {
        name: 'Djole'
      },
    },
    uri: '/Users/ljubinkovicd/Desktop/MojeAplikacije/ReactNativeRepos/ZooReact/Resources/img1.jpg',
    renderFooter: (data) => {
      return (
        <View key='brick-header' style={{ backgroundColor: 'white', padding: 5, paddingRight: 9, paddingLeft: 9}}>
          <Text style={{lineHeight: 20, fontSize: 14}}>{data.caption}</Text>
        </View>
      )
    },
    renderHeader: (data) => {
      return (
        <View key='brick-footer' style={styles.headerTop}>
          <Image
            source={{ uri: '/Users/ljubinkovicd/Desktop/MojeAplikacije/ReactNativeRepos/ZooReact/Resources/img1.jpg' }}
            style={styles.userPic}
          />
          <Text style={styles.userName}>{data.user.name}</Text>
        </View>
      )
    }
  },
  {
    uri: '/Users/ljubinkovicd/Desktop/MojeAplikacije/ReactNativeRepos/ZooReact/Resources/img1.jpg'
  },
  {
    uri: '/Users/ljubinkovicd/Desktop/MojeAplikacije/ReactNativeRepos/ZooReact/Resources/img2.jpg'
  },
  {
    uri: '/Users/ljubinkovicd/Desktop/MojeAplikacije/ReactNativeRepos/ZooReact/Resources/img3.jpg'
  },
  {
    uri: '/Users/ljubinkovicd/Desktop/MojeAplikacije/ReactNativeRepos/ZooReact/Resources/img4.png'
  },
  {
    uri: '/Users/ljubinkovicd/Desktop/MojeAplikacije/ReactNativeRepos/ZooReact/Resources/img5.jpg'
  },
  {
    uri: '/Users/ljubinkovicd/Desktop/MojeAplikacije/ReactNativeRepos/ZooReact/Resources/img1.jpg'
  },
]

export default class TestMasonry extends Component {

  constructor() {
    super();
    this.state = {
      columns: 2,
      padding: 5
    };
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
        <View style={[styles.center, styles.header]}>
          <Text style={{ fontWeight: '800', fontSize: 20 }}>Masonry Demo</Text>
        </View>
        <View style={[styles.center, styles.buttonGroup, { marginTop: 10, marginBottom: 25 }]}>
          <TouchableHighlight style={styles.button} onPress={() => this.setState({ columns: 2 })}>
            <Text>2 Column</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={() => this.setState({ columns: 3 })}>
            <Text>3 Columns</Text>
          </TouchableHighlight>
          <TouchableHighlight  style={styles.button} onPress={() => this.setState({ columns: 6 })}>
            <Text>6 Columns</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={() => this.setState({ columns: 9 })}>
            <Text>9 Columns</Text>
          </TouchableHighlight>
        </View>
        <View style={[styles.center, styles.slider, { marginTop: 10, marginBottom: 25, flexDirection: 'column'}]}>
         <View style={{paddingLeft: 10}}>
           <Text>Dynamically adjust padding: {this.state.padding}</Text>
         </View>
         <View style={{width: '100%'}}>
           <Slider
             style={{height: 10, margin: 10}}
             maximumValue={40}
             step={5}
             value={20}
             onValueChange={(value) => this.setState({padding: value})} />
         </View>
       </View>
       <View style={{flex: 1, flexGrow: 10, padding: this.state.padding}}>
         <Masonry
           sorted
           bricks={data}
           columns={this.state.columns}
           customImageComponent={FastImage} />
       </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    flex: 1,
    flexBasis: '10%'
  },
  header: {
    flexGrow: 1
  },
  buttonGroup: {
    flexGrow: 1
  },
  slider: {
    flexGrow: 1
  },
  button: {
    backgroundColor: '#dbdcdb',
    padding: 10,
    marginRight: 4,
    borderRadius: 4,
    borderBottomColor: '#7b7b7b',
    borderBottomWidth: 5
  },
  buttonText: {
    color: '#404040'
  },
  center: {
    marginTop: 30,
    marginBottom: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  headerTop: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  userPic: {
    height: 20,
    width: 20,
    borderRadius: 10,
    marginRight: 10
  },
  userName: {
    fontSize: 20
  }
});
