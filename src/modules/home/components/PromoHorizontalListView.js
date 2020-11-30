import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View, StyleSheet,
    Animated,
    ScrollView, TouchableOpacity,
    Text,
    Image,
    Linking
} from 'react-native';
import { images, Values, Colors } from '../../../config';
import FastImage from 'react-native-fast-image';

const width = Values.deviceWidth * 0.9;
const height = 140;
const carouselWidth = width;
const carouselHeight = height;//(width * 2) / 5;
const BAR_SPACE = 7;
const MAX_ITEMS_COUNT = 8;

import { promo } from '../../../data';


class PromoHorizontalListView extends Component {
    //carousel
    itemWidth = 6
    animVal = new Animated.Value(0)

    constructor(props) {
        super(props);
        this.state={
            activePage: 0,
            promotions: []
        }
        this._animateNextPage = this._animateNextPage.bind(this);
        this._setUpTimer = this._setUpTimer.bind(this);
        this._resetPager = this._resetPager.bind(this);
        this.scrollToPage = this.scrollToPage.bind(this);
    }
    componentDidMount() {
        this.setState({
            promotions: promo,
        });
    }

    componentWillUnmount() {
        if(this.timer) {
            clearInterval(this.timer);
        }

    }
    
    componentDidUpdate(prevProps, prevState) {
        
    }

    _animateNextPage() {
        const { promotions } = this.state;
        let {activePage} = this.state;
        if (activePage < promotions.length - 1) {
          activePage++;
        } else if (this.props.loop) {
          activePage = 0;
        } else if (!this.props.loop) {
          this.clearInterval(this.timer);
          return;
        }

        this.scrollToPage(activePage, true);
    }

    _setUpTimer() {
        const { promotions } = this.state;
        if (this.timer) {
          clearInterval(this.timer);
        }

        if (promotions.length > 1) {
          this.timer = setInterval(this._animateNextPage, this.props.delay);
        }
    }

    _resetPager() {
        const { promotions } = this.state;
        const {initialPage, autoplay} = this.props;
        if (initialPage > 0) {
          this.setState({activePage: initialPage});
          this.scrollToPage(initialPage, false);
        }
        if (promotions && autoplay) {
          this._setUpTimer();
        }
    }

    scrollToPage(activePage, animated) {
        this.setState({activePage});
        if(this.scrollView) {
            this.scrollView.scrollTo({
                x: activePage * (carouselWidth + 15),
                y: 0,
                animated,
            });
        }

    }

    render(){

        const { promotions } = this.state;
        ////carousel item
        let promotionArray = []
        let barArray = []

        promotions.forEach((promotion, i) => {
            const thisPromotion = (
                <TouchableOpacity key={`promotion${i}`}>
                    <FastImage
                        source={{ uri: promotion.imgUrl }}
                        style={i === promotions.length - 1 ? styles.lastImage : styles.image}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            )

            promotionArray.push(thisPromotion)
        })

        if(promotionArray.length == 0) return null;
        return <View style={{alignSelf: 'stretch'}}>
            <View style={styles.mainContainer}>
                <View style={styles.listContainer}>

                    <ScrollView
                        ref={(scrollView) => {
                            this.scrollView = scrollView;
                        }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={carouselWidth + 15}
                        decelerationRate={0}
                        scrollEventThrottle={20}
                        onScroll={
                            Animated.event(
                                [{ nativeEvent: { contentOffset: { x: this.animVal } } }]
                            )
                        }
                    >
                        {promotionArray}
                    </ScrollView>

                </View>
            </View>
        </View>


    }
}

PromoHorizontalListView.defaultProps = {
    loop : true,
    initialPage: 0,
    autoplay: true,
    delay: 10000
}

const styles = StyleSheet.create({
    mainContainer: {
        height: carouselHeight + 16,
        alignSelf: 'stretch',
        marginVertical: 8,
    },
    listContainer: {
        paddingTop: 7,
        height: height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        marginLeft: 10,
        height: "100%",
        borderRadius: 5,
        borderWidth:1,
        borderColor: Colors.lightGray,
        width: carouselWidth,
    },
    lastImage: {
        marginLeft: 10,
        height: "100%",
        marginRight: (Values.deviceWidth * 0.15) - 10,
        borderRadius: 5,
        width: carouselWidth,
        borderColor: Colors.lightGray,
        borderWidth:1,
    },
    barContainer: {
        position: 'absolute',
        zIndex: 2,
        left: 16,
        bottom: -1,
        flexDirection: 'row',
    },
    linkButton: {
        position: 'absolute',
        zIndex: 2,
        right: 16,
        bottom: -20,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    linkText: {
        fontSize: 12,
        color: Colors.secondaryColor
    },
    track: {
        backgroundColor: Colors.divider,
        overflow: 'hidden',
    },
    bar: {
        backgroundColor: Colors.gray,
        position: 'absolute',
    },
    title: {
        fontSize: 16,
        color: Colors.lightBlack
    },

});
const mapStateToProps = (state) => ({promo: state.promo });

export default connect(mapStateToProps)(PromoHorizontalListView);
