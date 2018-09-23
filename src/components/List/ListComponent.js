import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, FlatList, ActivityIndicator } from 'react-native';
import _ from 'lodash';
import { Card, ListItem, Button, List } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import ApiRequest from '../../utils/apiRequest';
import { styles } from './listComponentStyle';
import {CommanFunction} from '../../utils/commanFunctionClass';
export default class ListComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            list: [],
            loading: true,
            loadingBottom:false,
            page:1,
            keyWord:null,
            filtered_list:[],
            noMatchFound:false
        };
    }
    

    componentDidMount() {
        this.loadData(this.state.page);
    }
    componentWillReceiveProps(nextProps){
        nextProps.val==''?(this.state.keyWord=null):(this.state.keyWord = nextProps.val);
        this.filterCards(this.state.list,this.state.keyWord)
    }

    filterCards(arr,keyWord){
        let listOfCards = new CommanFunction().filterCard(arr,keyWord);
        if(listOfCards.length>0 || keyWord==null){
            this.state.filtered_list = listOfCards;
            this.state.noMatchFound = false;

        }
        else{
            this.state.noMatchFound = true;
        }
    }
    loadData(page){
        let allPostDetails = new ApiRequest(page);
        allPostDetails.fetchAllPost().then(data =>{
            this.setState({
                list: this.state.list.length>0?_.uniqBy([...this.state.list,...data.results],'webUrl'):data.results,
                loading: false,
                loadingBottom:false,
                noMatchFound:false

            })
        })
        .catch(err => {
            this.setState({
                list: [],
                loading: false,
                loadingBottom:false,
                noMatchFound:true

                
            })
        })
    }
    //Fetching more data
    loadMore = () => {
        this.setState((prevState) => {
            return {
                page:prevState.page+1,
                loadingBottom:true,
            }
        },() => {
            setTimeout(() => {
                this.loadData(this.state.page);
            },1000)
        })
        
    }
    handleNavigation = (item) => {
        this.props.navigation.navigate('Details',{
            data:item
        });
    }
    renderRow({item}) {
        return (
            <TouchableWithoutFeedback onPress={() => {this.handleNavigation(item)}}>
             <Card                
                image={{ uri: item.fields.thumbnail }}
                featuredTitle={item.webTitle}
                featuredTitleStyle={{textAlign:'center'}}
                featuredSubtitle={item.sectionName}>
                <Text style={styles.cardText}>
                  {new CommanFunction(item.fields.bodyText).truncBody()}  
                </Text>
            </Card> 
            </TouchableWithoutFeedback>
    
        )
    }
    
    renderFooter = () => {    
        return (          
            this.state.keyWord!==null?<Text></Text>: <View
                style={{
                  paddingVertical: 20,
                  padding: 30,
                }}
              ><ActivityIndicator animating size="large" /></View>
          
        );
      };

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignContent: "center" ,paddingVertical:0}}>
                
                {this.state.loading ? <ActivityIndicator size="large" /> : 
                this.state.noMatchFound==false?
                <List containerStyle={styles.container}>
                    <FlatList
                        data={this.state.filtered_list.length>0?this.state.filtered_list:this.state.list}
                        renderItem={this.renderRow.bind(this)}
                        keyExtractor={item => item.webUrl}
                        ListFooterComponent={this.renderFooter}
                        onEndReached = {this.state.keyWord!==null?null:this.loadMore}
                        onEndReachedThreshold={this.state.keyWord!==null?null:0.3}
                    />
                </List>:<Text style={{textAlign:'center'}}>No Matches Found</Text>}
            </View>
        )
    }
}


