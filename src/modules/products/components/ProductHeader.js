import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View, StyleSheet, FlatList,
    Animated, Image, Text,
    ScrollView, TouchableOpacity
} from 'react-native';

import { images, Colors } from '../../../config';

class ProductHeader extends Component {
   
    render(){
        const { products } = this.props;

        return <View style={styles.barContainer}>
            <Text style={styles.text}>{"Total Product: "+products.totalProduct}</Text>
        </View>
    }
}

const styles = StyleSheet.create({
    barContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10, 
        elevation: 2,
        paddingVertical: 10,
        backgroundColor:Colors.primaryColor,
        borderColor: "white", 
        borderWidth:1
    },
    text: {
        color:"white",
        fontSize: 16,
        fontWeight:"700"
    }
});

const mapStateToProps = state => ({
    products: state.products,
  });

export default connect(mapStateToProps)(ProductHeader);