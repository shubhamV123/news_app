
import React, { Component } from 'react';
import { View, Text, ScrollView,TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import  {styles}  from './detailListStyle';


export default class DetailList extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: <TouchableOpacity onPress={() => navigation.goBack()}><Icon name="arrow-left" size={20} style={{paddingLeft:10}}/></TouchableOpacity>
    });
    render() {
        const { navigation } = this.props;
        const item = navigation.getParam('data');
        return (
            <ScrollView>
                <Card
                    image={{ uri: item.fields.thumbnail?
                              item.fields.thumbnail:
                              "https://vignette.wikia.nocookie.net/citrus/images/6/60/No_Image_Available.png/revision/latest?cb=20170129011325" 
                            }}
                    imageStyle={styles.cardImage}
                    title={item.webTitle}
                    >
                    <View style={styles.cardContentView}>
                        <Text style={styles.cardContentText} >Upated At: {item.webPublicationDate.split('T')[0]}</Text>
                        <Text style={styles.cardContentText}>Posted By: {item.fields.byline}</Text>
                    </View>
                    <Text >
                        {item.fields.bodyText}
                    </Text>
                </Card>
                <View><Text >

                </Text></View>
            </ScrollView>

        )
    }
}
