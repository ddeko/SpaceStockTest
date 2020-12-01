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

import { SvgCssUri } from 'react-native-svg';

import { images, Colors, Values } from '../../config';

import { menu, products } from '../../data';

import { Icon } from 'react-native-elements';
import FastImage from 'react-native-fast-image';

import PromoHorizontalListView from './components/PromoHorizontalListView';
import LocationHorizontalListView from './components/LocationHorizontalListView';



class Menu extends React.Component {
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
      searchQry: '',
      filterVisible: false,
      filterSelectedName:"Apartemen",
      isRent: true,
      menus : menu,
      filterList: [{name: "Apartemen", id:1},
                    {name: "Rumah", id:2},
                    {name: "Kantor", id:3}
                  ],
      products: products
    }
  }

  componentDidMount() {
  }

  showFilter() {
    this.setState({
      filterVisible: !this.state.filterVisible,
    });
  }

  isRent() {
    this.setState({
      isRent: !this.state.isRent,
    });
  }

  renderListFilterItem = ({item}) => {
    return (
        <TouchableWithoutFeedback onPress={this.onSelectFilter.bind(this, item)} >
            <Text style={{fontSize: Values.fontSize.small,
                          textAlign: "left",
                          color: Colors.placeholder,
                          paddingVertical:4,}} ellipsizeMode="tail" numberOfLines={1}>
                {item.name}
            </Text>
        </TouchableWithoutFeedback>
    );
  };

  onSelectFilter = (item) => {
    this.setState({
      filterSelectedName: item.name,
    });
    this.showFilter();
  };

  renderSearch = () => {
    return  <View style={{backgroundColor: Colors.primaryColor, paddingVertical: 10, paddingHorizontal: 12, flexDirection:"column", flex: 1, justifyContent: "center", alignItems:"stretch", elevation: 1}} >
              <View style={{backgroundColor: Colors.primaryColor, flexDirection:"row", flex: 1, justifyContent: "space-between", alignItems:"center"}} >
                <View style={{flexDirection:"column", width: Values.deviceWidth *.6, paddingVertical: 15, }}>
                  <Text style={styles.smallText}>
                      {"Cari"}
                  </Text>
                  <TouchableOpacity style={styles.filterContainer} onPress={() =>
                      this.showFilter()}>
                      
                      <Text style={{fontSize: Values.fontSize.small,
                        color: Colors.placeholder,}}>
                          {this.state.filterSelectedName}
                      </Text>
                      <Image style={[{height: 24, width: 24,}, this.state.filterVisible ? {transform: [{ rotate: '-90deg'}],} : {transform: [{ rotate: '90deg'}],}]} source={images.keyboardRightArrow}>
                      </Image>
                  </TouchableOpacity>
                  
                </View>
                <View style={{flexDirection:"column", width: Values.deviceWidth *.32, paddingVertical: 15, }}>
                  <Text style={styles.smallText}>
                      {"Saya Ingin"}
                  </Text>
                  <TouchableOpacity style={[styles.checkRentContainer]} onPress={() =>
                      this.isRent()}>
                      <View style={this.state.isRent ? styles.isRentCheckedLeft : styles.isRentNotCheckedLeft}>
                        <Text style={this.state.isRent ? styles.isRentCheckedText : styles.isRentnotCheckedText}>
                            {"Sewa"}
                        </Text>
                      </View>
                      <View style={!this.state.isRent ? styles.isRentCheckedRight : styles.isRentNotCheckedRight}>
                        <Text style={!this.state.isRent ? styles.isRentCheckedText : styles.isRentnotCheckedText}>
                            {"Beli"}
                        </Text>
                      </View>
                      
                  </TouchableOpacity>
                </View>
              </View>
              {this.state.filterVisible ?
                  <View style={{paddingHorizontal: 15,
                      maxHeight: 100,
                      elevation:4,
                      backgroundColor: Colors.white,
                      position:'absolute',
                      zIndex: 150,
                      top: 90,
                      left:0,
                      right:0,
                      marginHorizontal:12,
                      width: Values.deviceWidth *.6
                      }}>
                      <FlatList
                          data={this.state.filterList}
                          renderItem={this.renderListFilterItem}
                          keyExtractor={(item, index) => index.toString()}
                          contentContainerStyle={{paddingVertical: 7, rrpaddingBottom: 12}}
                          extraData={this.props}
                      />
                  </View>
                  :null
              }
              <View style={{backgroundColor: Colors.primaryColor, flexDirection:"column", flex: 1, paddingBottom: 12}} >
                <Text style={styles.smallText}>
                    {"Cari Lokasi"}
                </Text>
                <View style={[styles.filterContainer, {justifyContent:"flex-start",}]}>
                  <Icon
                      name='search'
                      type='material'
                      color={Colors.divider}
                      size={20}
                    />
                    <TextInput
                        placeholder={"Ketik lokasi atau nama gedung"}
                        placeholderTextColor={Colors.placeholder}
                        underlineColorAndroid={Colors.transparent}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        style={styles.textInput}
                        editable={true}
                        value={this.state.searchQry}
                        onChangeText={(searchQry) => this.setState({ searchQry })}
                    />
                </View>
              </View>
          </View>
  }

  renderHeader = () => {
    return  <View style={{backgroundColor: Colors.white,  flexDirection:"row", flex: 1, height: Values.deviceHeight*.2, width:"100%"}} >
                <FastImage
                    source={{ uri: "https://res.cloudinary.com/dpqdlkgsz/image/upload/v1/homepage/hero.png" }}
                    style={{ height: "100%", width:"100%"}}
                    resizeMode="cover"
                />
                <View style={{position: 'absolute', top: 0, left: 0, right: 15, bottom: 0, justifyContent: 'center', alignItems: 'flex-end'}}>
                  <Text style={{fontSize: Values.fontSize.xLarge,
                    textAlign: "right",
                    color: Colors.placeholder,
                    alignSelf: "stretch",
                    fontWeight: "700"
                    }}>{"Properti\ndi Ujung Jari"}</Text>
                </View>
          </View>
  }
  
  renderListItem = (index, item) => {
    return <TouchableOpacity style={{alignItems: 'center', backgroundColor: "whites", 
        borderRadius: 8}} >
          <View style={{height: Values.deviceWidth * .22, width: Values.deviceWidth * .22, borderRadius:8, backgroundColor: Colors.white, elevation:1, justifyContent:"center", alignItems:"center"}}>
            <View style={{height:"45%", width:"45%", borderRadius: Values.deviceWidth * .22, backgroundColor: Colors.transparent, justifyContent:"center", alignItems:"center"}}>
              <SvgCssUri
                width="100%"
                height="100%"
                uri={item.icon}
              />
            </View>
            <Text style={{fontSize: Values.fontSize.xxxSmall, color: Colors.black, textAlignVertical: "center", textAlign:"center", marginTop: 4}}>{item.title}</Text>

          </View>
    </TouchableOpacity>
  }

  renderListProductItem = (index, item) => {
    return <TouchableOpacity style={{alignItems: 'center', backgroundColor: "whites", borderRadius: 8, marginVertical: 8, marginRight: 15}} onPress={() => { this.onSubmit(item)}}>
          <View style={{height:Values.deviceWidth*.75, width:Values.deviceWidth*.58, borderRadius:8, elevation: 1, backgroundColor: Colors.white, borderColor:Colors.lightGray, borderWidth:1}}>
            <Image source={{ uri: item.image }}
                style={{
                    backgroundColor: Colors.lightGray2,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    justifyContent: "center",
                    alignSelf: "center",
                    resizeMode: "cover",
                    height: "55%",
                    width: "100%",
                }} />
            <View style={{padding:8}}>
              <Text style={{fontSize:9, color: Colors.placeholder, textAlignVertical: "center", textAlign:"left", fontWeight:"bold", marginBottom:4,}}>{item.unit + " Unit Tersedia"}</Text>
              <Text style={{fontSize:14, color: Colors.black, textAlignVertical: "center", textAlign:"left", fontWeight:"bold", marginBottom:6,}}>{item.name}</Text>
              <Text style={{fontSize:10, color: Colors.placeholder, textAlignVertical: "center", textAlign:"left", marginBottom:6,}}>{"Mulai"}</Text>
              <Text style={{fontSize:14, color: Colors.black, textAlignVertical: "center", textAlign:"left", fontWeight:"bold", marginBottom:6,}}>{"Rp. " + item.price + " Juta"}</Text>
              <View style={{flexDirection:"row",  alignItems:"center"}}>
                <Icon
                    name='map-pin'
                    type='font-awesome'
                    color={Colors.gray}
                    size={10}
                  />
                <Text style={{fontSize:10, color: Colors.placeholder, textAlignVertical: "top", textAlign:"left", marginLeft: 8}}>{item.location}</Text>
              </View>
            </View>
          </View>
    </TouchableOpacity>
  }

  onSubmit = (item) => {
    this.props.navigation.navigate("ProductDetail", { productId: item.id});
  }

  render() {
    const { products } = this.props;

    return (
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <StatusBar backgroundColor={Colors.secondaryColor} barStyle="light-content" />
        {this.renderHeader()}
        {this.renderSearch()}

        <FlatList
            data={this.state.menus}
            renderItem={
                ({ index, item }) => this.renderListItem(index, item)
            }
            numColumns={4}
            columnWrapperStyle={styles.scheduleListWrapper}
            contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 10, borderColor:Colors.divider, borderWidth:1, backgroundColor: Colors.lightGray2}}
            keyExtractor={(item, index) => index.toString()}
            extraData={this.props}
        />

        <View style={{paddingVertical: 15, paddingHorizontal: 12, backgroundColor: Colors.primaryColor}}>
          <Text style={{fontSize: Values.fontSize.medium, color: Colors.black, textAlignVertical: "center", textAlign:"left", fontWeight:"bold"}}>{"Agen properti terpercaya berbasis teknologi"}</Text>
          <PromoHorizontalListView navigation={this.props.navigation} />
          <Text style={{fontSize: Values.fontSize.medium, color: Colors.black, textAlignVertical: "center", textAlign:"left", fontWeight:"bold"}}>{"Telusuri"}</Text>
          <LocationHorizontalListView navigation={this.props.navigation} />
          <Text style={{fontSize: Values.fontSize.medium, color: Colors.black, textAlignVertical: "center", textAlign:"left", fontWeight:"bold"}}>{"Beli - Apartemen Populer"}</Text>
          <FlatList
            data={this.state.products}
            renderItem={
                ({ index, item }) => this.renderListProductItem(index, item)
            }
            horizontal={true}
            contentContainerStyle={{ paddingVertical: 7}}
            keyExtractor={(item, index) => index.toString()}
            extraData={this.props}
            showsHorizontalScrollIndicator={false}
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
    flexGrow: 1,
  }, 
  topRightIconContainer: {
    height: 32,
    width: 32,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "column",
    backgroundColor: "white",
    elevation: 8,
    justifyContent:"center",
    paddingVertical: 18,
    borderTopColor: "white",
    borderTopWidth: 2,
  },
  buttonTextSubmit: {
    fontSize: 14,
    textAlign: "center",
    color: "white",
  },
  filterContainer: {
    flexDirection: 'row',
    alignSelf:'stretch',
    justifyContent:"space-between",
    paddingHorizontal: 12,
    alignItems: 'center',
    height: 40,
    backgroundColor: Colors.white,
    borderWidth:1,
    borderColor: Colors.placeholder,
    borderRadius: 7,
    flex:1
  },
  textInput: {
    color: Colors.placeholder,
    backgroundColor: Colors.white,
    alignSelf:'stretch',
    textAlignVertical: "center",
    alignItems:"center",
    paddingLeft: 10,
    includeFontPadding:false
  },
  headerBox: {
    flexDirection:"row",
    backgroundColor: Colors.white,
    borderColor: Colors.divider,
    borderWidth:2,
  },
  textHeader: {
    fontSize: 13,
    color: Colors.lightBlack,
    marginHorizontal: 8,
    textAlignVertical:"center"
  },
  scheduleListWrapper: {
    flex: 1,
    justifyContent: "space-between",
  },
  filter: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  smallText: {
    fontSize: Values.fontSize.small,
    color: Colors.placeholder, 
    marginBottom: 5
  },
  checkRentContainer: {
    flexDirection: 'row',
    alignSelf:'stretch',
    justifyContent:"center",
    alignItems: 'stretch',
    height: 40,
    backgroundColor: Colors.white,
    borderWidth:1,
    borderColor: Colors.secondaryColor,
    borderRadius: 7,
    flex:1
  },
  isRentCheckedLeft:{
    backgroundColor: Colors.secondaryColor, 
    justifyContent:"center",
    alignItems:"center",
    flex: 1,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  isRentNotCheckedLeft:{
    backgroundColor: Colors.white, 
    justifyContent:"center",
    alignItems:"center",
    flex: 1,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  isRentCheckedRight:{
    backgroundColor: Colors.secondaryColor, 
    justifyContent:"center",
    alignItems:"center",
    flex: 1,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  isRentNotCheckedRight:{
    backgroundColor: Colors.white, 
    justifyContent:"center",
    alignItems:"center",
    flex: 1,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  isRentCheckedText:{
    fontSize: Values.fontSize.small,
    color: Colors.white,
  },
  isRentNotCheckedText:{
    fontSize: Values.fontSize.small,
    color: Colors.placeholder,
  },
});

const mapStateToProps = state => ({
  products: state.products,
});

export default connect(mapStateToProps)(Menu);