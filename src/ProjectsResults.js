'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import ProjectDetailPage from './ProjectDetailPage';
import { List, SearchBar } from 'react-native-elements';

const BASE_URL = 'https://panoptes.zooniverse.org/api';
const PROJECTS_URL = 'https://panoptes.zooniverse.org/api/projects';

function urlProjectsRequestQuery(page = 1, pageSize = 20, sort = "id") {

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

class ListItem extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      backgroundImage: '',
      avatarImage: '',
    };
  }

  _onTap = () => {
    this.props.onRowTap(this.props.index, this.state.backgroundImage);
  }

  _sendProjectRequests = (backgroundImageRequest, avatarRequest) => {

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

    fetch(backgroundImageRequest, myInit)
      .then(response => response.json())
      .then(responseDataJson => {
        console.log(responseDataJson.media[0].src)
        this.setState({
          backgroundImage: responseDataJson.media[0].src
        })
      }).then(() => {
        fetch(avatarRequest, myInit)
          .then(response => response.json())
          .then(responseDataJson => {
            console.log(responseDataJson.media[0].src)
            this.setState({
              avatarImage: responseDataJson.media[0].src
            })
          });
      }).catch(error =>
        this.setState({
          isLoading: false,
          message: 'Something bad happened' + error
        }));
  }

  componentDidMount() {
    const AVATARS_URL = BASE_URL + this.props.project.links.avatar.href;
    const BACKGROUNDS_URL = BASE_URL + this.props.project.links.background.href;

    this._sendProjectRequests(
      BACKGROUNDS_URL,
      AVATARS_URL
    );
  }

  render() {
    const project = this.props.project;
    const avatarImageUrl = this.state.avatarImage;
    const title = project.title;
    const description = project.description;
    const createdAt = project.created_at;

    return (
      <TouchableHighlight
        onPress={this._onTap}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: avatarImageUrl != '' ? avatarImageUrl : '/Users/ljubinkovicd/Desktop/MojeAplikacije/ReactNativeRepos/ZooReact/Resources/noImagePlaceholder.gif' }} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description} numberOfLines={2}>{description}</Text>
            </View>
          </View>
          <View style={styles.extraDataContainer}>
            <Text style={styles.createdAt}>Created: {createdAt.substring(0, 10)} at {createdAt.substring(11, 19)}</Text>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    )
  }
}

export default class ProjectsResults extends Component {

  constructor(props) {
    super(props);

    this.state = {
      projectList: [],
      page: 1,
      pageSize: 20,
      isLoading: false,
      refreshing: false,
      backgroundImage: '',
      avatarImage: '',
      isLoadFirstTime: true,
    };
  }

  componentDidMount() {
    this._sendRequest(PROJECTS_URL + '?page=' + this.state.page + "&page_size=" + this.state.pageSize)
  }

  _keyExtractor = (item, index) => index;

  _renderProject = ({item, index}) => (
    <ListItem
      project={item}
      index={index}
      onRowTap={this._onRowTap}
    />
  );

    _onRowTap = (index, backgroundImage) => {
      console.log("Pressed row: " + index);
      this.props.navigator.push({
        title: this.state.projectList[index].display_name,
        component: ProjectDetailPage,
        passProps: {project: this.state.projectList[index], backgroundImageUrl: backgroundImage != '' ? backgroundImage : '/Users/ljubinkovicd/Desktop/MojeAplikacije/ReactNativeRepos/ZooReact/Resources/noImagePlaceholder.gif'}
      });
    }

    // filterSearch = (text) => {
    //   let myText = text.toLowerCase()
    //   console.log(myText)
    //
    //   console.log(this.search(myText, this.state.projectList));
    //
    //   if (this.search(myText, this.state.projectList) == undefined) {
    //     console.log("UNDEFINED MATHAFACKA");
    //     this.setState({
    //       projectList: this.state.projectList
    //     })
    //  } else {
    //    this.setState({
    //      projectList: this.search(myText, this.state.projectList)
    //    })
    //  }
    // }

    search(titleKeyValue, projectsArray) {
      for (var i = 0; i < projectsArray.length; i++) {
        if (projectsArray[i].title.toLowerCase() === titleKeyValue) {
          return projectsArray[i];
        }
      }
    }

    renderHeader = () => {
      return <SearchBar
        placeholder="Type here..."
        onChangeText={this.filterSearch} />
    }

    renderFooter = () => {
      if (!this.state.isLoading) return null;
      return (
        <View style={{ paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#003366' }}>
          <ActivityIndicator animating size='large' />
        </View>
      )
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

      if (this.state.isLoadFirstTime) {
        fetch(request, myInit)
          .then(response => response.json())
          .then(json => {
            this.setState({
              projectList: [...this.state.projectList, ...json.projects],
              isLoading: false,
              refreshing: false,
              isLoadFirstTime: false,
            })
          }).catch(error =>
            console.log(error))
          .done();
      } else {
        setTimeout(() => {
          fetch(request, myInit)
            .then(response => response.json())
            .then(json => {
              this.setState({
                projectList: [...this.state.projectList, ...json.projects],
                isLoading: false,
                refreshing: false,
              })
            }).catch(error =>
              console.log(error))
            .done();
        }, 10000)
      }
    }

    handleRefresh = () => {
      this.setState({
        page: this.state.page + 1,
        pageSize: this.state.pageSize + 20,
        refreshing: true
      }, () => {
        this._sendRequest(PROJECTS_URL + '?page=' + this.state.page + "&page_size=" + this.state.pageSize, )
      })
    }

    handleLoadMore = () => {
      this.setState({
        page: this.state.page + 1,
        pageSize: this.state.pageSize + 20,
        isLoading: true,
      }, () => {
        this._sendRequest(PROJECTS_URL + '?page=' + this.state.page + "&page_size=" + this.state.pageSize, )
      })
    }

    /*
      data provides the data to display
      keyExtractor provides a unique key that React uses for efficient list item management
      renderItem specifies how the UI is rendered for each row
    */
    render() {
      const spinner = this.state.isLoading ? <ActivityIndicator size={0} color='#003366'/> : null;

      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            {spinner}
          </View>
          <List containerStyle={{ backgroundColor: '#fffafa', borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList style={styles.flatList}
              data={this.state.projectList}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderProject}
              ListHeaderComponent={this.renderHeader}
              ListFooterComponent={this.renderFooter}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
              onEndReached={this.handleLoadMore}
              onEndThreshold={100} />
          </List>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 40,
  },
  textContainer: {
    flex: 1,
  },
  separator: {
    height: 1,
    width: '77%',
    marginLeft: '23%',
    backgroundColor: '#003366',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
  },
  description: {
    fontSize: 20,
    color: '#656565',
  },
  rowContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  createdAt: {
    fontSize: 15,
    color: '#656565',
    paddingHorizontal: 5,
    textAlign: 'right',
  },
});
