import React, { Component } from 'react';
import { Platform, StyleSheet , View,  } from 'react-native';
import HeaderSearchBar from './SearchBar/headerSearchBar';
import ListComponent from './List/ListComponent';


export default class HomeScreen extends Component {
    state = {
      val:null
    }
    handleChange = (val) => {
      this.setState({val})
      }
  render() {
    let {navigation} = this.props;
    return (
    <View style={{flex:1}}>
        <HeaderSearchBar handleChange = {this.handleChange.bind(this)}/>
        <ListComponent navigation={navigation} val={this.state.val}/>
      </View>
    )
  }
}
