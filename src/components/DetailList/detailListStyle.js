import { StyleSheet } from 'react-native';

module.exports.styles = StyleSheet.create({
    cardImage: {
        height: 250
    },
    cardContentView:{
        flex:1,
        flexDirection: 'column',
        alignContent:'space-around',
        justifyContent:"space-between" 
    },
    cardContentText : {
        fontWeight:'bold'
    }
  });