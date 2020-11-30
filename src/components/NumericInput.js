import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';

import { images } from '../config';

class NumericInput extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            value: props.value? props.value: 0,
        }
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.value != nextProps.value) {
          
            this.setState({value: nextProps.value})
        }
    }
    render = () => {
        const { value } = this.state;
    return (
        <View style={{flexDirection: 'row', height: 36, alignItems: 'center', justifyContent: 'center', ...this.props.style}}>
            <TouchableOpacity
                onPress={()=> {
                    var minusValue = value - 1;
                    if( minusValue < 0)
                        minusValue = 0;
                    this.setState({value: minusValue});
                    if(this.props.onMinus) {
                        this.props.onPlus(minusValue);
                    }
                    if(this.props.onValueChange) {
                        this.props.onValueChange(minusValue);
                    }
                }}
                style={styles.iconContainer}
                >
                <Image style={styles.icon} source={images.btnRemove}/>
            </TouchableOpacity>
            <Text style={styles.text}>{value}</Text>
            <TouchableOpacity
                onPress={()=> {
                    let plusValue = value + 1;
                    this.setState({value: plusValue});
                    if(this.props.onMinus) {
                        this.props.onMinus(plusValue);
                    }
                    if(this.props.onValueChange) {
                        this.props.onValueChange(plusValue);
                    }
                    
                }}
                style={styles.iconContainer}
                >
                <Image style={styles.icon} source={images.btnAdd}/>
            </TouchableOpacity>

            
       

        </View>

    );
  };
}

const styles = StyleSheet.create({
    icon: {
        width: 36,
        height: 36,
        resizeMode : 'contain'
    },
    iconContainer: {
        width: 36, 
        height: 36, 
        justifyContent:'center', 
        alignItems:'center'
    },
    text: {
        fontSize: 17
    }
});


export default NumericInput;
