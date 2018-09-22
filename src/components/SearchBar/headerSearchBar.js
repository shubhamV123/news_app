import React, { Component } from 'react'
import { SearchBar } from 'react-native-elements'
import { View } from 'react-native';



export default class HeaderSearchBar extends Component {
  handleChange = (val) => {
    console.log("Value is coming:",val);
  }
  render() {
    return (
      <View>
        <SearchBar
          noIcon
          onChangeText = {this.handleChange}
          placeholder='Type Here Somethings...' />
      </View>
    )
  }
}
