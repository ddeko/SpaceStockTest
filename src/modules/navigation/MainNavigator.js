import React from 'react';

import { createAppContainer, createStackNavigator } from 'react-navigation';

import { YellowBox, View, Image } from "react-native";
import { images } from '../../config';

import ProductList from '../products/ProductList';
import Summary from '../products/Summary';
import Menu from '../home/Menu';


YellowBox.ignoreWarnings([
    "Warning: isMounted(...) is deprecated",
    "Module RCTImageLoader",
    "source.uri should not be an empty string",
    "Accessing view manager configs directly off UIManager via UIManager['getConstants'] is no longer supported. Use UIManager.getViewManagerConfig('getConstants') instead.",
    "Warning: Accessing view manager configs directly off UIManager view UiManager[AirMapLite] is no longer supported."
]);

const stackNavigator = createStackNavigator({
        Menu: { screen: Menu },
        ProductList: { screen: ProductList },
        Summary: { screen: Summary }
    },
   
);

export default createAppContainer(stackNavigator);