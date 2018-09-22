import React, { Component } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import _ from 'lodash';
import { Card, ListItem, Button, List } from 'react-native-elements';
import ApiRequest from '../../utils/apiRequest';
import { styles } from './listComponentStyle';
import {CommanFunction} from '../../utils/commanFunctionClass';
// function truncBody(str){
//     if(str.length>95){
//         return str.substr(0,95)+'...'
//     }
//     return str;
// }
export default class ListComponent extends Component {

    state = {
        list: [],
        loading: true,
        loadingBottom:false,
        page:1
    };

    componentDidMount() {
        this.loadData(this.state.page);
    }
    loadData(page){
        let allPostDetails = new ApiRequest(page);
        allPostDetails.fetchAllPost().then(data =>{
            console.log(data.results);
            this.setState({
                list: this.state.list.length>0?_.uniqBy([...this.state.list,...data.results],'webUrl'):data.results,
                loading: false,
                loadingBottom:false,
                
            })
        });
    }
    //Fetching more data
    loadMore = () => {
        console.log('ITs working',this.state.list)
        this.setState((prevState) => {
            console.log('Previos page',prevState.page);
            return {
                page:prevState.page+1,
                loadingBottom:true,
            }
        },() => {
            console.log('After Update page',this.state.page);
            setTimeout(() => {
                this.loadData(this.state.page);
            },1500)
        })
        
    }
    renderRow({ item }) {
        return (
            <Card 
                image={{ uri: item.fields.thumbnail }}
                featuredTitle={item.webTitle}
                featuredTitleStyle={{textAlign:'center'}}
                featuredSubtitle={item.sectionName}>
                <Text style={styles.cardText}>
                  {new CommanFunction(item.fields.bodyText).truncBody()}  
                </Text>
            </Card>
        )
    }
    
    renderFooter = () => {
        // if (!this.state.loadingBottom) return null;
    
        return (
          <View
            style={{
              paddingVertical: 20,
              padding: 30,
            }}
          >
            <ActivityIndicator animating size="large" />
          </View>
        );
      };

    render() {
        console.log("State is ",this.state);
        return (
            <View style={{ flex: 1, justifyContent: "center", alignContent: "center" ,paddingVertical:0}}>
                {this.state.loading ? <ActivityIndicator size="large" /> : <List containerStyle={styles.container}>
                    <FlatList
                        data={this.state.list}
                        renderItem={this.renderRow}
                        keyExtractor={item => item.webUrl}
                        ListFooterComponent={this.renderFooter}
                        onEndReached = {this.loadMore}
                        onEndReachedThreshold={0.3}
                    />
                </List>}
            </View>
        )
    }
}


