import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';

import ProductHeader from './components/ProductHeader';

import { clearProducts } from './actions/ProductAction'
import { images, Colors } from '../../config';

class ProductList extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return { 
      headerStyle: {
          backgroundColor: "white",
      },
      headerTintColor: "black",
      title: "Checkout",
   };
  };

  constructor(props) {
    super(props);
    this.state = {
        quantity : 1,
    }
  }

  componentDidMount() {
    
  }

  renderListItem = (index, item) => {
    return <View style={{alignSelf: 'stretch', backgroundColor: "whites", 
        marginHorizontal: 10, marginTop: 15, borderBottomColor: "black", borderBottomWidth:1}}>
          <Text>{item.title}</Text>
          <View style={{flexDirection: "row",}}>
            <Text>{"Quantity : "}</Text>
            <Text>{item.quantity + " x"}</Text>
          </View>
          
    </View>
  }

  onSubmit = () => {
    this.props.dispatch(clearProducts());

    const resetAction = StackActions.reset({
      index: 0,
      actions: [
          NavigationActions.navigate({ 
              routeName: 'ProductList',
          }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    const { products } = this.props;

    return (
      <View style={styles.mainContainer}>
          <ProductHeader/>
          <FlatList
              data={products.selectedProducts}
              renderItem={
                  ({ index, item }) => this.renderListItem(index, item)
              }
              keyExtractor={(item, index) => index.toString()}
              extraData={this.props}
          />
          <View style={styles.buttonContainer}>
              <TouchableOpacity
                  style={styles.buttonSubmit} 
                  onPress={() => { this.onSubmit()}}>
                  <Text style={styles.buttonTextSubmit}>
                      {"Buy"}
                  </Text>
              </TouchableOpacity>
              
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
      flex:1,
      backgroundColor: "white",
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
  buttonSubmit: {
    height: 40,
    borderRadius: 7,
    elevation: 1,
    justifyContent: "center",
    marginHorizontal: 25,
    backgroundColor: Colors.primaryColor
  },
  buttonTextSubmit: {
    fontSize: 14,
    textAlign: "center",
    color: "white",
  },
});

const mapStateToProps = state => ({
  products: state.products,
});

export default connect(mapStateToProps)(ProductList);