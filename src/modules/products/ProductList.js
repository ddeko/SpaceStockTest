import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import { NumericInput } from '../../components';
import ProductHeader from './components/ProductHeader';

import { fetchProducts, checkout, onChangeItem } from './actions/ProductAction'
import { images, Colors } from '../../config';


class ProductList extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return { 
      headerStyle: {
          backgroundColor: "white",
      },
      headerTintColor: "black",
      title: "Product List",
   };
  };

  constructor(props) {
    super(props);
    this.state = {
        quantity : 1,
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }

  renderListItem = (index, item) => {
    return <View style={{alignSelf: 'stretch', backgroundColor: "whites", 
        borderRadius: 8, marginHorizontal: 10, marginTop: 15}}>
          <Text>{item.title}</Text>
          <NumericInput
              defaultValue={1}
              style={{width : 80, marginTop: 8}}
              value={item.quantity}
              onValueChange={(value)=>{
                this.onChange(item, value)
              }}
          />
    </View>
  }

  onChange = (item, value) => {
    const { products } = this.props;

    item.quantity= value;
    this.props.dispatch(onChangeItem());
  }

  onSubmit = () => {
    const { products } = this.props;

    this.props.dispatch(checkout(products.items));
    
    this.props.navigation.navigate("Summary")
    
  }

  render() {
    const { products } = this.props;

    return (
      <View style={styles.mainContainer}>
          <ProductHeader/>
          <FlatList
              data={products.items}
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
                      {"Checkout"}
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