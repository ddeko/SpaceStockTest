import { combineReducers } from 'redux';

import products from '../modules/products/reducer/ProductReducers';
import promo from '../modules/home/reducer/PromoReducers';

export default combineReducers({
    products,
    promo
});