import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput, Image,
  Animated, StatusBar,
  ScrollView, Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';

import { images, Colors, Values } from '../../config';

import { product } from '../../data';

import { Icon } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { SvgCssUri } from 'react-native-svg';


class ProductDetail extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return { 
      headerStyle: {
          backgroundColor: Colors.primaryColor,
          elevation: 1,
      },
      headerTintColor: Colors.white,
      headerBackground: (
          <View
          style={{ flex: 1, backgroundColor: Colors.transparent }}
          />
      ),
      headerLeft: (
          <View style={{width: 130, height: 30, marginLeft: 10, 
                                    justifyContent: 'center', alignItems: 'center'}}
                            >
            <SvgCssUri
              width="100%"
              height="100%"
              uri={"https://res.cloudinary.com/dpqdlkgsz/image/upload/t_aparecium_minima_x/v1/Periurus%20Memoria/icon/spacestock.svg"}
            />
          </View>
      ),
      headerRight: (
      <View style={{flexDirection:"row", marginRight: 5, justifyContent: "center", alignItems:"center"}}>
            <TouchableWithoutFeedback>
                <View style={styles.topRightIconContainer}>
                  <Icon
                    name='search'
                    type='material'
                    color={Colors.placeholder}
                    size={26}
                  />
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
                <View style={styles.topRightIconContainer}>
                    <SvgCssUri
                      width="70%"
                      height="70%"
                      uri={"https://res.cloudinary.com/dpqdlkgsz/image/upload/t_aparecium_minima_x/Periurus%20Memoria/icon/burger.svg"}
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>

      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      product: product,
      imgShow: product.photos[0].image,

    }
  }

  componentDidMount() {
    
  }

  onSelectImage = (item) => {
    this.setState({
      imgShow: item.image,
    });
  };

  render() {
    const { product } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <StatusBar backgroundColor={Colors.secondaryColor} barStyle="light-content" />

        <View style={{ height: Values.deviceHeight*.35, width:Values.deviceWidth}}>
          <FastImage
            source={{ uri: this.state.imgShow }}
            style={{ height: "100%", width:"100%"}}
            resizeMode="cover"
          />
        </View>
        <View style={{ flex:1}}>
          <FlatList
            data={product.photos.slice(0, 5)}
            renderItem={({ item }) => (
                            <TouchableOpacity style={{height: 70, width:Values.deviceWidth*.2, alignItems: 'center'}} onPress={this.onSelectImage.bind(this, item)}>
                                <FastImage
                                  source={{ uri: item.image }}
                                  style={{ height: "100%", width:"100%"}}
                                  resizeMode="cover"
                                />
                            </TouchableOpacity>
                        )}
            horizontal={true}
            contentContainerStyle={{ padding:0}}
            keyExtractor={(item, index) => index.toString()}
            extraData={this.props}
          />
        </View>
        <View style={{paddingTop: 12, paddingBottom: 25, paddingHorizontal: 15, backgroundColor: Colors.primaryColor, flex:1}}>
          <Text style={{fontSize: Values.fontSize.large, color: Colors.black, textAlignVertical: "center", textAlign:"left", fontWeight:"bold"}}>{product.name}</Text>
          <View style={{flexDirection:"row",  alignItems:"center", marginVertical:8}}>
            <Icon
                name='map-pin'
                type='font-awesome'
                color={Colors.gray}
                size={12}
              />
            <Text style={{fontSize:12, color: Colors.placeholder, textAlignVertical: "top", textAlign:"left", marginLeft: 8}}>{product.address}</Text>
          </View>
          <View style={{ marginTop: 10, flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>
            <TouchableOpacity style={{height: 28, width: Values.deviceWidth*.33, alignItems: 'center', borderWidth:1, borderColor: Colors.darkBlue, borderRadius: 20, justifyContent:"center", alignItems:"center", marginRight: 8}} >
              <Text style={{fontSize:12, color: Colors.darkBlue, textAlignVertical: "top", textAlign:"center"}}>{product.rentUnit + " Unit Sewa"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{height: 28, width: Values.deviceWidth*.33, alignItems: 'center', borderWidth:1, borderColor: Colors.darkBlue, borderRadius: 20, justifyContent:"center", alignItems:"center"}} >
              <Text style={{fontSize:12, color: Colors.darkBlue, textAlignVertical: "top", textAlign:"center"}}>{product.buyUnit + " Unit Beli"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{paddingVertical: 12, paddingHorizontal: 15, backgroundColor: Colors.lightGray, flex:1}}>
          <Text style={{fontSize: Values.fontSize.medium, color: Colors.black, textAlignVertical: "center", textAlign:"left", fontWeight:"bold"}}>{"Kompleks Spesialis"}</Text>
          <Text style={{fontSize:11, color: Colors.black, textAlignVertical: "center", textAlign:"left"}}>{"Dapatkan hunian idaman lebih cepat dengan bantuan agen kami."}</Text>
          <FlatList
            data={product.agents}
            renderItem={({ item }) => (
                            <View style={{alignItems: 'stretch', elevation :1, flex:1, justifyContent:"center", alignSelf:"stretch", backgroundColor:Colors.primaryColor,
                                          borderRadius: 8, marginVertical: 4 }}>
                                <View style={{flexDirection:"row", justifyContent:"flex-start", alignItems:"center", paddingHorizontal: 10, paddingVertical: 10 }}>
                                  <View style={{ height: 55, width: 55, borderRadius: 60, marginHorizontal: 7}}>
                                    <FastImage
                                      source={{ uri: item.image }}
                                      style={{ height: "100%", width:"100%" , borderRadius: 60}}
                                      resizeMode="cover"
                                    />
                                  </View>
                                  <View style={{flexDirection:"column", justifyContent:"center", alignItems:"flex-start", flex:1, paddingHorizontal: 7 }}>
                                    <Text style={{fontSize: Values.fontSize.small, color: Colors.black, textAlignVertical: "center", textAlign:"left", fontWeight:"bold", marginBottom:4}}>{item.name}</Text>
                                    <Text style={{fontSize:11, color: Colors.gray, textAlignVertical: "center", textAlign:"left", marginBottom:4}}>{item.title}</Text>
                                    <TouchableOpacity style={{height: 28, alignItems: 'center', borderRadius: 8, justifyContent:"center", alignItems:"center", backgroundColor: Colors.secondaryColor, elevation:1, marginBottom:4, paddingHorizontal: 15, paddingVertical:5}} >
                                      <Text style={{fontSize:12, color: Colors.white, textAlignVertical: "top", textAlign:"center"}}>{"Kontak agen"}</Text>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                            </View>
                        )}
            contentContainerStyle={{paddingVertical:12}}
            keyExtractor={(item, index) => index.toString()}
            extraData={this.props}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    backgroundColor: Colors.white,
    // flexGrow: 1,
  }, 
  topRightIconContainer: {
    height: 32,
    width: 32,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

});

const mapStateToProps = state => ({
  products: state.products,
});

export default connect(mapStateToProps)(ProductDetail);